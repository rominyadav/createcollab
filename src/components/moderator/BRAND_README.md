# Brand Profile Review System

## Overview

The Brand Profile Review System provides moderators with comprehensive tools to review and manage brand profiles on the platform. It includes detailed brand information, admin user management, billing details, and collaboration tracking.

## Components

### 1. `brand-reviews.tsx`

- **Purpose**: Main component for listing and reviewing pending brand submissions
- **Features**:
  - Displays list of brands pending review
  - Shows key brand information (name, industry, employees, revenue, location)
  - Review button opens detailed brand profile modal
  - Integrates with mock data from `brand-mockdata.json`

### 2. `brand-profile-review.tsx`

- **Purpose**: Comprehensive modal for reviewing brand profiles with approval/rejection actions
- **Features**:
  - **Brand Information Section**: Basic details, description, location
  - **Company Documents**: PAN number, VAT number, company registration details
  - **Brand Admin Users**: List of all admin users with roles and contact info
  - **Account & Billing**: Subscription plan, payment details, expiry dates
  - **Deposit Requests**: Track funding requests and their status
  - **Coupons/Discounts**: Manage promotional codes and their usage
  - **Creator Collaborations**: View creators who have worked with the brand
  - **Active Campaigns**: Monitor ongoing marketing campaigns
  - **Review Actions**: Approve or reject brand profiles
  - **Quick Stats**: Summary of key metrics

### 3. `brand-profile-view.tsx`

- **Purpose**: View-only version of brand profile without action buttons
- **Features**: Same comprehensive information display as review component
- **Use Case**: For viewing approved brands or general brand information

## Mock Data Structure

### Brand Object

```typescript
interface Brand {
  id: number;
  name: string;
  logo: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  founded: string;
  employees: string;
  revenue: string;
  status: "pending" | "approved" | "rejected";
  verified: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
  documents: {
    panNumber: string;
    vatNumber: string;
    companyRegistration: string;
    registrationNumber: string;
  };
  adminUsers: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    isPrimary: boolean;
  }>;
  billing: {
    plan: string;
    subscriptionType: string;
    subscriptionExpiry: string;
    monthlyAmount: number;
    currency: string;
    paymentMethod: string;
    lastBillingDate: string;
    nextBillingDate: string;
  };
  depositRequests: Array<{
    id: number;
    amount: number;
    currency: string;
    status: string;
    requestedDate: string;
    approvedDate?: string;
    purpose: string;
    adminUser: string;
  }>;
  coupons: Array<{
    id: number;
    code: string;
    discount: string;
    type: string;
    validFrom: string;
    validUntil: string;
    maxUses: number;
    usedCount: number;
    minOrderAmount: number;
    status: string;
  }>;
  creatorCollaborations: Array<{
    creatorId: number;
    creatorName: string;
    creatorAvatar: string;
    campaigns: number;
    totalSpent: number;
    lastCollaboration: string;
    rating: number;
  }>;
  campaigns: Array<{
    id: number;
    title: string;
    budget: number;
    status: string;
    startDate: string;
    endDate: string;
  }>;
}
```

## Key Features

### 1. **Brand Information Display**

- Company details, industry, founding year, employee count
- Revenue information and business description
- Complete address and location details

### 2. **Document Verification**

- PAN card number validation
- VAT number tracking
- Company registration documents
- Registration number verification

### 3. **Admin User Management**

- Multiple admin users per brand
- Role-based access control
- Primary admin designation
- Contact information for all users

### 4. **Billing & Subscription**

- Plan details and subscription type
- Payment method tracking
- Billing cycle management
- Expiry date monitoring

### 5. **Financial Tracking**

- Deposit request management
- Request approval workflow
- Purpose tracking and amounts
- Multi-currency support

### 6. **Promotional Management**

- Coupon code tracking
- Discount type and amounts
- Usage limits and validation
- Expiry date management

### 7. **Creator Collaboration Tracking**

- Creator profile integration
- Campaign collaboration history
- Spending tracking
- Performance ratings

### 8. **Campaign Management**

- Active campaign monitoring
- Budget tracking
- Timeline management
- Status updates

## UI/UX Features

### 1. **Modern Design**

- Clean, card-based layout
- Responsive grid system
- Dark mode support
- Consistent color scheme

### 2. **Interactive Elements**

- Hover effects on creator collaborations
- Clickable creator profiles
- Status badges with color coding
- Responsive buttons and forms

### 3. **Information Organization**

- Logical grouping of related data
- Clear section headers with icons
- Consistent spacing and typography
- Easy-to-scan layouts

### 4. **Navigation**

- Fixed header with brand info
- Scrollable content areas
- Right sidebar for quick actions
- Modal-based interaction

## Integration Points

### 1. **Creator System**

- Links to creator profiles
- Collaboration history
- Performance metrics
- Campaign tracking

### 2. **Payment System**

- Deposit request workflow
- Billing cycle management
- Subscription tracking
- Payment method validation

### 3. **Document Management**

- Company registration verification
- Tax document validation
- Compliance tracking
- Document expiry management

## Usage Examples

### 1. **Brand Review Process**

```typescript
// Open brand review modal
const handleReviewClick = (brand: Brand) => {
  setSelectedBrand(brand);
};

// Approve brand
const handleApproval = (brandId: number, action: "approve" | "reject") => {
  // Update brand status
  // Send notifications
  // Update database
};
```

### 2. **Creator Navigation**

```typescript
// Navigate to creator profile
const handleCreatorClick = (creatorId: number) => {
  // Navigate to creator profile page
  // Or open creator modal
  console.log(`Navigating to creator ${creatorId}`);
};
```

## Future Enhancements

### 1. **Advanced Filtering**

- Industry-based filtering
- Revenue range filtering
- Location-based search
- Status-based categorization

### 2. **Analytics Dashboard**

- Brand performance metrics
- Collaboration success rates
- Revenue tracking
- Campaign effectiveness

### 3. **Automated Workflows**

- Document expiry notifications
- Payment due reminders
- Status change alerts
- Compliance monitoring

### 4. **Integration Features**

- CRM system integration
- Accounting software sync
- Document verification APIs
- Payment gateway integration

## Technical Implementation

### 1. **State Management**

- React hooks for local state
- Modal open/close management
- Form data handling
- Real-time updates

### 2. **Data Flow**

- Mock data integration
- Props-based communication
- Event handling
- State persistence

### 3. **Performance**

- Lazy loading of components
- Efficient re-rendering
- Optimized data structures
- Responsive interactions

### 4. **Accessibility**

- Keyboard navigation
- Screen reader support
- High contrast support
- Focus management

## Conclusion

The Brand Profile Review System provides a comprehensive solution for moderators to manage brand profiles effectively. With its detailed information display, interactive features, and modern UI design, it streamlines the brand review process while maintaining high standards of data organization and user experience.

The system is designed to be extensible, allowing for future enhancements and integrations while maintaining consistency with the existing platform architecture.
