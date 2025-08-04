import React, { createContext, useContext, useState } from 'react';
import { TourProvider as ReactTourProvider, useTour as useReactTour } from '@reactour/tour';

const TourContext = createContext();

/**
 * TourProvider component that manages guided tours throughout the application.
 * 
 * Provides context for starting tours, managing tour state, and handling tour events.
 * Uses @reactour/tour to create interactive step-by-step guides for users.
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that will have access to tour context
 * @returns {JSX.Element} Tour context provider with ReactTour component
 */
export const TourProvider = ({ children }) => {
  const [tourState, setTourState] = useState({
    isOpen: false,
    steps: [],
    currentStep: 0,
    tourType: null,
  });

  const startTour = (steps, tourType) => {
    setTourState({
      isOpen: true,
      steps,
      currentStep: 0,
      tourType,
    });
  };

  const stopTour = () => {
    setTourState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const tourStyles = {
    popover: (base) => ({
      ...base,
      '--reactour-accent': '#de7a37',
      borderRadius: '8px',
      fontSize: '14px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    }),
    maskArea: (base) => ({
      ...base,
      rx: 8,
    }),
    badge: (base) => ({
      ...base,
      left: 'auto',
      right: '-0.8125em',
    }),
    controls: (base) => ({
      ...base,
      marginTop: '16px',
    }),
    close: (base) => ({
      ...base,
      right: '16px',
      top: '16px',
    }),
  };

  return (
    <TourContext.Provider value={{ startTour, stopTour, tourState }}>
      <ReactTourProvider
        steps={tourState.steps}
        isOpen={tourState.isOpen}
        onRequestClose={stopTour}
        styles={tourStyles}
        className="tour-popover"
        showNavigation={true}
        showPrevNextButtons={true}
        showCloseButton={true}
        showBadge={true}
        scrollSmooth={true}
        disableInteraction={false}
        disableKeyboardNavigation={false}
        padding={{
          mask: 10,
          popover: [10, 10],
        }}
        beforeClose={() => {
          stopTour();
          return true;
        }}
      >
        {children}
      </ReactTourProvider>
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