/**
 * Tour steps configuration for different user roles and sections.
 * Each tour contains an array of step objects with target selectors, content, and placement.
 */

// Admin Dashboard Tour Steps
export const adminDashboardSteps = [
  {
    target: '.admin-sidebar',
    content: (
      <div>
        <h3>Admin Sidebar Navigation</h3>
        <p>This sidebar contains all the main sections you can manage as an admin. Use it to navigate between different management areas.</p>
      </div>
    ),
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '[href="/admin/products"]',
    content: (
      <div>
        <h3>Products Management</h3>
        <p>Click here to manage your product catalog. You can add, edit, and delete products, as well as manage their images and datasheets.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[href="/admin/dealers"]',
    content: (
      <div>
        <h3>Dealer Verification</h3>
        <p>This section allows you to review and verify dealer applications, manage their status, and view their documents.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[href="/admin/quotations"]',
    content: (
      <div>
        <h3>Quotations Management</h3>
        <p>Review and manage customer quotation requests. You can approve, reject, or modify quotations here.</p>
      </div>
    ),
    placement: 'right',
  },
];

// Admin Product Form Tour Steps
export const adminProductFormSteps = [
  {
    target: '[name="product_name"]',
    content: (
      <div>
        <h3>Product Name</h3>
        <p>Enter a clear, descriptive name for your product. This will be displayed to customers and used in search results.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[name="product_description"]',
    content: (
      <div>
        <h3>Product Description</h3>
        <p>Provide a detailed description of the product. Include key features, specifications, and what makes this product special.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name="category"]',
    content: (
      <div>
        <h3>Product Category</h3>
        <p>Select the appropriate category for your product. This helps customers find products and organizes your inventory.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name="price_usd"]',
    content: (
      <div>
        <h3>Pricing Information</h3>
        <p>Set the product price in USD. You can also set a ZWL price. Dealers will see these prices in their dashboard.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '#image-upload',
    content: (
      <div>
        <h3>Product Images</h3>
        <p>Upload high-quality images of your product. You can upload multiple images - the first one will be the main display image.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[name="datasheet"]',
    content: (
      <div>
        <h3>Product Datasheet</h3>
        <p>Upload a PDF datasheet with technical specifications. This helps customers make informed decisions.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Admin Dealer Verification Tour Steps
export const adminDealerVerificationSteps = [
  {
    target: '.dealer-card:first-child',
    content: (
      <div>
        <h3>Dealer Cards</h3>
        <p>Each card represents a dealer application. Click on any card to view detailed information and take actions.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.status-filter',
    content: (
      <div>
        <h3>Status Filter</h3>
        <p>Use this filter to view dealers by their current status: Pending, Approved, Rejected, or Suspended.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.search-dealers',
    content: (
      <div>
        <h3>Search Dealers</h3>
        <p>Search for specific dealers by name, email, trading name, or username to quickly find what you're looking for.</p>
      </div>
    ),
    placement: 'bottom',
  },
];

// Admin Quotation Management Tour Steps
export const adminQuotationSteps = [
  {
    target: '.quotation-overview',
    content: (
      <div>
        <h3>Quotation Overview</h3>
        <p>This section shows summary statistics of all quotations. Click on different status cards to filter quotations.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.quotation-card:first-child',
    content: (
      <div>
        <h3>Quotation Cards</h3>
        <p>Each card shows a quotation request. Click to expand and see customer details, products, and action buttons.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.quotation-actions',
    content: (
      <div>
        <h3>Quotation Actions</h3>
        <p>Use these buttons to approve or reject quotations. You can also reapprove previously rejected quotations.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Dealer Registration Tour Steps
export const dealerRegistrationSteps = [
  {
    target: '.progress-tracker',
    content: (
      <div>
        <h3>Registration Progress</h3>
        <p>This tracker shows your progress through the dealer registration process. Complete all sections to become a verified dealer.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.company-details-section',
    content: (
      <div>
        <h3>Company Details</h3>
        <p>Start by entering your company information. This includes your registered company name, trading name, and registration numbers.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.documents-section',
    content: (
      <div>
        <h3>Required Documents</h3>
        <p>Upload the required legal documents: Tax Clearance Certificate, Certificate of Incorporation, and National ID copies of directors.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.installations-section',
    content: (
      <div>
        <h3>Installation Examples</h3>
        <p>Add examples of your previous installations. This helps us verify your experience and expertise in solar installations.</p>
      </div>
    ),
    placement: 'bottom',
  },
];

// Dealer Company Details Form Tour Steps
export const dealerCompanyFormSteps = [
  {
    target: '[name="registered_company"]',
    content: (
      <div>
        <h3>Registered Company Name</h3>
        <p>Enter the exact name as it appears on your company registration documents. This must match your legal business name.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[name="trading_name"]',
    content: (
      <div>
        <h3>Trading Name</h3>
        <p>Enter the name you use for business operations. This might be different from your registered company name.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name="company_reg_number"]',
    content: (
      <div>
        <h3>Company Registration Number</h3>
        <p>Enter your official company registration number as issued by the relevant authorities.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name="VAT_number"]',
    content: (
      <div>
        <h3>VAT Number (Optional)</h3>
        <p>If your company is VAT registered, enter your VAT number here. This field is optional.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name="TIN"]',
    content: (
      <div>
        <h3>TIN (Optional)</h3>
        <p>Enter your Tax Identification Number if applicable. This field is optional but recommended for tax purposes.</p>
      </div>
    ),
    placement: 'bottom',
  },
];

// Dealer Document Upload Tour Steps
export const dealerDocumentSteps = [
  {
    target: '#tax_clearance',
    content: (
      <div>
        <h3>Tax Clearance Certificate</h3>
        <p>Upload a clear, readable image of your current tax clearance certificate. Ensure the document is valid and not expired.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '#certificate_of_incorporation',
    content: (
      <div>
        <h3>Certificate of Incorporation</h3>
        <p>Upload your company's certificate of incorporation. This proves your business is legally registered.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '#national_ID_Copies_of_the_Directors',
    content: (
      <div>
        <h3>Directors' National IDs</h3>
        <p>Upload clear copies of national IDs for all company directors. You can upload multiple files for multiple directors.</p>
      </div>
    ),
    placement: 'bottom',
  },
];

// Dealer Installation Form Tour Steps
export const dealerInstallationSteps = [
  {
    target: '[name*="systemDescription"]',
    content: (
      <div>
        <h3>System Description</h3>
        <p>Describe the solar system you installed. Include details about the type of system, components used, and any special features.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[name*="sizeOfSystem"]',
    content: (
      <div>
        <h3>System Size</h3>
        <p>Enter the capacity of the installed system (e.g., "5kW", "10kW"). Be specific about the power rating.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name*="email"]',
    content: (
      <div>
        <h3>Customer Contact</h3>
        <p>Provide the customer's email address. This helps us verify the installation with the customer if needed.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name*="phoneNumber"]',
    content: (
      <div>
        <h3>Customer Phone</h3>
        <p>Enter the customer's phone number for verification purposes. Make sure it's a valid, reachable number.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.add-installation-btn',
    content: (
      <div>
        <h3>Add More Installations</h3>
        <p>You need at least 3 installation examples. Click this button to add more installations to demonstrate your experience.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Admin User Management Tour Steps
export const adminUserManagementSteps = [
  {
    target: '.add-admin-btn',
    content: (
      <div>
        <h3>Add New Admin</h3>
        <p>Click here to add a new admin user to the system. You can create accounts for other administrators.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.admin-list-table',
    content: (
      <div>
        <h3>Admin Users List</h3>
        <p>This table shows all admin users in the system. You can see their details and remove users if necessary.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Admin Blog Form Tour Steps
export const adminBlogFormSteps = [
  {
    target: '[name="title"]',
    content: (
      <div>
        <h3>Blog Title</h3>
        <p>Enter an engaging title for your blog post. Make it descriptive and SEO-friendly to attract readers.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[name="author"]',
    content: (
      <div>
        <h3>Author Name</h3>
        <p>Enter the name of the person who wrote this blog post. This will be displayed to readers.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.image-upload-area',
    content: (
      <div>
        <h3>Blog Images</h3>
        <p>Upload up to 2 images for your blog post. These images will be displayed alongside your content to make it more engaging.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[name="body"]',
    content: (
      <div>
        <h3>Blog Content</h3>
        <p>Write your blog content here. Use clear, engaging language and structure your content with paragraphs for better readability.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Admin Team Management Tour Steps
export const adminTeamFormSteps = [
  {
    target: '[name="name"]',
    content: (
      <div>
        <h3>Team Member Name</h3>
        <p>Enter the full name of the team member. This will be displayed on the team page.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.role-selection',
    content: (
      <div>
        <h3>Team Member Role</h3>
        <p>Select the appropriate role/position for this team member. Choose from the available positions in the company.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.image-upload-section',
    content: (
      <div>
        <h3>Member Photo</h3>
        <p>Upload a professional photo of the team member. This will be displayed on the team page and should be high quality.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[name="bio"]',
    content: (
      <div>
        <h3>Member Biography</h3>
        <p>Write a brief biography about the team member. Include their background, expertise, and role in the company.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Admin Case Study Form Tour Steps
export const adminCaseStudyFormSteps = [
  {
    target: '[name="projectName"]',
    content: (
      <div>
        <h3>Project Name</h3>
        <p>Enter a descriptive name for this case study project. Make it clear and memorable for visitors.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[name="location"]',
    content: (
      <div>
        <h3>Project Location</h3>
        <p>Specify where this project was completed. Include city, state/province, and country for clarity.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[name="systemCapacity"]',
    content: (
      <div>
        <h3>System Capacity</h3>
        <p>Enter the total capacity of the installed system (e.g., "5kW", "100kW"). Be specific about the power rating.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.case-study-images',
    content: (
      <div>
        <h3>Project Images</h3>
        <p>Upload up to 3 high-quality images showing the completed installation. These help showcase your work quality.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.youtube-input',
    content: (
      <div>
        <h3>Project Video</h3>
        <p>Add a YouTube video link if you have a video showcasing this project. The video will be embedded in the case study.</p>
      </div>
    ),
    placement: 'top',
  },
];

// Dealer Profile Tour Steps
export const dealerProfileSteps = [
  {
    target: '.profile-edit-btn',
    content: (
      <div>
        <h3>Edit Profile</h3>
        <p>Click here to edit your personal information including name, email, and username.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.company-details-section',
    content: (
      <div>
        <h3>Company Information</h3>
        <p>This section displays your company details that were submitted during registration. Contact admin if changes are needed.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.documents-section',
    content: (
      <div>
        <h3>Uploaded Documents</h3>
        <p>View all the documents you've uploaded during registration. These are used for verification purposes.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.installations-section',
    content: (
      <div>
        <h3>Your Installations</h3>
        <p>This section shows all the installation examples you've provided. These demonstrate your experience and expertise.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.change-password-btn',
    content: (
      <div>
        <h3>Change Password</h3>
        <p>Click here to change your account password. You'll need to provide your current password and set a new one.</p>
      </div>
    ),
    placement: 'bottom',
  },
];