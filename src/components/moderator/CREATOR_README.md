# Moderator Components

This directory contains components for the moderator dashboard and functionality.

## Creator Profile Review System

### Components

#### `creator-profile-review.tsx`

A comprehensive modal component that displays detailed creator information for review purposes.

**Features:**

- **Creator Information Card**: Name, avatar, email, bio, followers/following counts, location, and engagement rate
- **Video Pricing Section**: Displays pricing for different video lengths (15sec, 30sec, 60sec, 1-5min, 5min+)
- **Profile Status**: Shows completion status, verification status, and current review status
- **Shipping Address**: Creator's shipping information
- **Social Media Links**: Facebook, Instagram, TikTok, and YouTube links with appropriate icons
- **Creator Videos**: Grid display of creator's uploaded videos
- **Theme Toggle**: Integrated theme switching functionality
- **Floating Chat Button**: Peal-shaped floating button for opening chat with creator

**Props:**

- `creator`: Creator object with all profile information
- `onApprove`: Callback function when creator is approved
- `onReject`: Callback function when creator is rejected
- `onClose`: Callback function to close the modal

#### `creator-reviews.tsx`

Updated component that integrates with the profile review system.

**Features:**

- Lists all pending creators for review
- Click "Review" button to open detailed profile review modal
- Quick approve/reject actions
- Uses mock data from `creator-mockdata.json`

### Mock Data

#### `creator-mockdata.json`

Contains sample creator data with the following structure:

```json
{
  "id": 1,
  "name": "Creator Name",
  "avatar": "CN",
  "followers": "12.5K",
  "following": "2.1K",
  "niche": "Fashion",
  "email": "creator@email.com",
  "bio": "Creator bio description",
  "socialLinks": ["@handle", "website.com"],
  "pricing": {
    "15sec": { "type": "fixed", "amount": 1000 },
    "30sec": { "type": "fixed", "amount": 2000 },
    "60sec": { "type": "range", "min": 2500, "max": 3000 },
    "1-5min": { "type": "range", "min": 3100, "max": 3100 },
    "5min+": { "type": "fixed", "amount": 3500 }
  },
  "shippingAddress": "Full address string",
  "profileCompletion": "Complete",
  "status": "pending",
  "verified": true,
  "location": { "city": "City", "state": "State", "country": "Country" },
  "engagement": "4.2%",
  "videos": [...]
}
```

### Usage

1. **Open Creator Reviews**: Navigate to the moderator dashboard and click on "Creator Reviews"
2. **Review Creator**: Click the "Review" button on any creator card
3. **Detailed Review**: The modal will open showing comprehensive creator information
4. **Take Action**: Use the approve/reject buttons or close the modal
5. **Theme Toggle**: Use the theme toggle button in the top-right corner of the modal

### Design Features

- **Floating Overlay**: Modal appears above the creator list with backdrop blur
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Mode Support**: Integrated theme switching
- **Consistent UI/UX**: Follows the same design patterns as other moderator components
- **3D Depth Effects**: Subtle shadows and hover animations
- **Accessibility**: Proper ARIA labels and keyboard navigation support

### Integration

The creator profile review system integrates seamlessly with:

- Existing moderator dashboard
- Theme system
- Mock data infrastructure
- Component library (@ui components)
- Responsive design system
