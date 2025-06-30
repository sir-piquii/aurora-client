# Aurora Energy Technical Manual

## Technical Stack

### Frontend
- **Framework**: React 19.0.0
- **Routing**: React Router DOM 7.1.4
- **State Management**: React Context API
- **UI Components**: Custom components with Tailwind CSS
- **Animations**: Framer Motion 12.0.6
- **Icons**: Lucide React 0.474.0, React Icons 5.4.0
- **Form Handling**: Native React state
- **HTTP Client**: Axios 1.7.9
- **Date Handling**: date-fns 4.1.0
- **Notifications**: Sonner 2.0.3
- **Carousel**: React Slick 0.30.3, Slick Carousel 1.8.1
- **Charts**: Recharts 2.15.3
- **Number Input**: RC Input Number 9.4.0

### Styling
- **CSS Framework**: Tailwind CSS 4.0.1
- **Fonts**: @fontsource/anta 5.1.1
- **PostCSS**: 8.5.1 with Autoprefixer

### Backend (API Integration)
- **API Base URL**: https://api.auroraenergy.co.zw
- **Authentication**: JWT-based token authentication
- **Data Format**: JSON

## Code Structure Overview

### Root Structure
- `/public`: Static assets and HTML template
- `/src`: Main source code
  - `/admin`: Admin panel components and logic
  - `/components`: Reusable UI components
  - `/context`: React context providers
  - `/dealer`: Dealer portal components
  - `/Layout`: Layout components
  - `/router`: Routing utilities
  - `/routes`: Route definitions
  - `/views`: Page components
  - `/assets`: Images, audio, and other static assets

### Key Files
- `src/App.js`: Main application component with routing
- `src/api.js`: API service with endpoint definitions
- `src/index.js`: Application entry point
- `src/context/AuthContext.js`: Authentication context provider

### Admin Module Structure
- `/admin/components`: Admin UI components organized by feature
  - `/dashboard`: Dashboard-specific components
  - `/sales`: Sales management components
  - `/ui`: Reusable UI components for admin
- `/admin/AdminPanel.js`: Main admin panel layout
- `/admin/Sidebar.js`: Admin navigation sidebar
- `/admin/Navbar.js`: Admin top navigation bar

### Dealer Module Structure
- `/dealer/components`: Dealer portal components
  - `/forms`: Form components for dealer registration
  - `/ui`: UI components specific to dealer portal
- `/dealer/DealerPanel.js`: Main dealer panel layout
- `/dealer/Sidebar.js`: Dealer navigation sidebar

## Component Architecture

### Public Site Components
The public site follows a component-based architecture with:
- Layout components (`PublicLayout.js`)
- Page components (in `/views` directory)
- Reusable UI components (in `/components` directory)

Components are designed to be modular and reusable, with clear separation of concerns:
- Data fetching is typically done in page components
- UI rendering is handled by presentational components
- Global state is managed through context providers

### Admin Panel Architecture
The admin panel is structured around feature-based components:
- Each admin feature (Products, Blogs, etc.) has its own component
- CRUD operations are implemented with form components
- List views display data in tables or grids
- Detail views show individual items

### Routing System
- Uses React Router v7 for navigation
- Protected routes for admin and dealer sections
- Route definitions in `src/App.js` and `src/routes/AdminRoutes.js`

## Security Practices

### Authentication
- JWT-based authentication system
- Tokens stored in localStorage with expiration
- Protected routes for admin and dealer sections
- Role-based access control (admin, dealer, user)

### User Roles and Permissions
- **Admin/Super**: Full access to admin panel and all features
- **Dealer**: Access to dealer portal with restricted permissions
- **User**: Access to public site features and user-specific actions

### Authentication Flow
1. User logs in with username/email and password
2. Server validates credentials and returns JWT token
3. Token is stored in localStorage with user information
4. Token is included in API requests via Authorization header
5. Protected routes check for valid token and appropriate role

### Password Security
- Passwords are never stored in plaintext
- Password reset functionality via email
- Password change requires current password verification

## API Integration

### API Service
The `api.js` file contains all API endpoint definitions and functions for interacting with the backend:

```javascript
// Example API function
export const getProducts = async () => {
  try {
    const response = await axios.get(`${endpoints.products}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
```

### Error Handling
- Try/catch blocks for API calls
- Error messages displayed using toast notifications
- Console logging for debugging

## State Management

### Context API
The application uses React Context API for global state management:

- `AuthContext`: Manages user authentication state
- `SidebarContext`: Manages sidebar open/close state
- `DealerContext`: Provides dealer data to components

### Local Component State
- Component-specific state is managed using React's useState hook
- Form state is typically managed within form components

## Data Flow

### Public Site
1. User navigates to a page
2. Page component fetches data from API
3. Data is passed to child components for rendering
4. User interactions trigger state updates or API calls

### Admin Panel
1. Admin logs in and is redirected to admin dashboard
2. Admin navigates to a section (e.g., Products)
3. Component fetches data from API
4. Admin can view, add, edit, or delete items
5. Changes trigger API calls and state updates

## Deployment and Environment

### Environment Variables
- API URL configured via environment variables
- Different environments (development, production) use different API endpoints

### Build Process
- Standard Create React App build process
- Production builds are optimized for performance

## Maintenance and Troubleshooting

### Common Issues
- Authentication token expiration
- API connectivity issues
- Form validation errors

### Debugging
- Console logging for tracking issues
- Network tab in browser dev tools for API call inspection
- React DevTools for component inspection

## User Manual

### Admin Users

#### Login
1. Navigate to the login page
2. Enter your admin username/email and password
3. Click "Login"
4. You will be redirected to the admin dashboard

#### Admin Dashboard Navigation
- Use the sidebar to navigate between different sections
- On mobile, use the menu button to toggle the sidebar

#### Managing Products
1. Navigate to "Products" in the sidebar
2. View the list of products
3. Click "Add Product" to create a new product
4. Click the edit icon to modify an existing product
5. Click the delete icon to remove a product

#### Managing Featured Products
1. Navigate to "Featured Products" in the sidebar
2. View the list of featured products
3. Click "Add Featured Product" to feature a product
4. Click the edit icon to modify a featured product
5. Click the delete icon to remove a featured product

#### Managing Content (Articles, Blogs, FAQs, etc.)
1. Navigate to the desired content type in the sidebar
2. View the list of items
3. Click "Add [Item]" to create a new item
4. Click the edit icon to modify an existing item
5. Click the delete icon to remove an item

#### Managing Dealers
1. Navigate to "Dealer Verification" in the sidebar
2. View the list of dealer applications
3. Click on a dealer to view details
4. Approve, reject, or suspend dealers based on their application

#### User Management
1. Navigate to "User Management" in the sidebar
2. View the list of admin users
3. Click "Add Admin" to create a new admin user
4. Click the delete icon to remove an admin user

### Dealer Users

#### Login
1. Navigate to the login page
2. Enter your dealer username/email and password
3. Click "Login"
4. You will be redirected to the dealer dashboard

#### Dealer Registration
1. Navigate to "Become a Dealer" in the sidebar
2. Complete the registration form with company details
3. Upload required documents
4. Add installation examples
5. Submit for approval

#### Managing Profile
1. Navigate to "Profile" in the sidebar
2. View and edit your profile information
3. Change your password if needed

#### Viewing Quotations
1. Navigate to "Quotations" in the sidebar
2. View the list of quotations
3. Click on a quotation to view details

### End Users

#### Browsing Products
1. Navigate to the "Products" page
2. Browse products by category
3. Click on a product to view details

#### Adding Products to Cart
1. Navigate to a product detail page
2. Click "Add to Cart"
3. View your cart by clicking the cart icon in the header

#### Requesting Quotes
1. Navigate to a product detail page
2. Click "Request a Quote"
3. Fill out the quote request form
4. Submit the form

#### Creating an Account
1. Click "Sign Up" in the header
2. Fill out the registration form
3. Verify your email address
4. Log in with your new account