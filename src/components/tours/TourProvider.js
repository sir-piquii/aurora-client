import React, { createContext, useContext, useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const TourContext = createContext();

/**
 * TourProvider component that manages guided tours throughout the application.
 * 
 * Provides context for starting tours, managing tour state, and handling tour events.
 * Uses react-joyride to create interactive step-by-step guides for users.
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that will have access to tour context
 * @returns {JSX.Element} Tour context provider with Joyride component
 */
export const TourProvider = ({ children }) => {
  const [tourState, setTourState] = useState({
    run: false,
    steps: [],
    stepIndex: 0,
    tourType: null,
  });

  const startTour = (steps, tourType) => {
    setTourState({
      run: true,
      steps,
      stepIndex: 0,
      tourType,
    });
  };

  const stopTour = () => {
    setTourState(prev => ({
      ...prev,
      run: false,
    }));
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setTourState(prev => ({
        ...prev,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      }));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      stopTour();
    }
  };

  const tourStyles = {
    options: {
      primaryColor: '#de7a37',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      zIndex: 10000,
    },
    tooltip: {
      borderRadius: '8px',
      fontSize: '14px',
    },
    tooltipContainer: {
      textAlign: 'left',
    },
    tooltipTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#001f3f',
      marginBottom: '8px',
    },
    tooltipContent: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#555555',
    },
    buttonNext: {
      backgroundColor: '#de7a37',
      color: '#ffffff',
      borderRadius: '6px',
      padding: '8px 16px',
      border: 'none',
      fontWeight: '500',
    },
    buttonBack: {
      backgroundColor: '#001f3f',
      color: '#ffffff',
      borderRadius: '6px',
      padding: '8px 16px',
      border: 'none',
      fontWeight: '500',
      marginRight: '8px',
    },
    buttonSkip: {
      backgroundColor: 'transparent',
      color: '#666666',
      border: '1px solid #cccccc',
      borderRadius: '6px',
      padding: '8px 16px',
      fontWeight: '500',
    },
  };

  return (
    <TourContext.Provider value={{ startTour, stopTour, tourState }}>
      {children}
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={tourState.run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={tourState.steps}
        stepIndex={tourState.stepIndex}
        styles={tourStyles}
        locale={{
          back: 'Previous',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip Tour',
        }}
      />
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};