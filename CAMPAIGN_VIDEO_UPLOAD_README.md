# Campaign Video Upload Feature

## Overview

Added a new feature that allows creators to upload campaign-specific videos directly from their "My Campaigns" section.

## Components Added

### 1. CampaignVideoUpload Component

- **Location**: `src/components/creator/campaigns/shared/campaign-video-upload.tsx`
- **Purpose**: Dedicated upload interface for campaign deliverables
- **Features**:
  - Campaign-specific context display
  - Deliverables checklist
  - File upload with validation
  - Campaign notes/description
  - Upload guidelines specific to campaigns

### 2. Updated CampaignCard Component

- **Location**: `src/components/creator/campaigns/shared/campaign-card.tsx`
- **Changes**:
  - Added "Upload Video" button alongside "View Campaign" button
  - Button only appears for campaigns the creator has joined (`isApplied = true`)
  - Integrated modal state management for video upload

## Key Features

### Campaign Context

- Shows campaign details (brand, title, price, category)
- Displays campaign deliverables as a checklist
- Campaign-specific upload guidelines

### Upload Interface

- Similar UI/UX to regular video upload
- Campaign-focused messaging and validation
- Higher file size limit (500MB vs 100MB for regular uploads)
- Simplified form (no tags, categories auto-set)

### User Experience

- Seamless integration with existing My Campaigns workflow
- Clear visual distinction between regular uploads and campaign deliverables
- Contextual information to help creators meet campaign requirements

## Usage

1. Creator navigates to "My Campaigns" section
2. For joined campaigns, they see both "View Campaign" and "Upload Video" buttons
3. Clicking "Upload Video" opens the campaign-specific upload modal
4. Creator uploads video with campaign context and notes
5. Video is submitted for brand review and approval

## Technical Implementation

- Reuses existing UI components (Button, Card, Input, etc.)
- Follows established patterns from regular upload component
- Maintains consistent styling with shadcn/ui design system
- Proper TypeScript interfaces and error handling
