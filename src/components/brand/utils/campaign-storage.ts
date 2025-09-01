// Utility functions for managing campaign data
// In a real application, these would make API calls to update the backend

interface Campaign {
  id: number;
  title: string;
  description: string;
  brandName: string;
  brandLogo: string;
  price: number;
  currency: string;
  createdDate: string;
  validTillDate: string;
  creatorsSlotRemaining: number;
  totalSlots: number;
  category: string;
  requirements: string[];
  deliverables: string[];
  status: string;
}

// Local storage key for campaigns
const CAMPAIGNS_STORAGE_KEY = "brand-campaigns";

export const campaignStorage = {
  // Get all campaigns from localStorage
  getCampaigns: (): Campaign[] => {
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading campaigns from storage:", error);
      return [];
    }
  },

  // Save campaigns to localStorage
  saveCampaigns: (campaigns: Campaign[]): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
      console.log("Campaigns saved to localStorage");
    } catch (error) {
      console.error("Error saving campaigns to storage:", error);
    }
  },

  // Update a specific campaign
  updateCampaign: (updatedCampaign: Campaign): void => {
    const campaigns = campaignStorage.getCampaigns();
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === updatedCampaign.id ? updatedCampaign : campaign
    );
    campaignStorage.saveCampaigns(updatedCampaigns);
  },

  // Add a new campaign
  addCampaign: (newCampaign: Omit<Campaign, "id">): Campaign => {
    const campaigns = campaignStorage.getCampaigns();
    const maxId =
      campaigns.length > 0 ? Math.max(...campaigns.map((c) => c.id)) : 0;
    const campaignWithId = { ...newCampaign, id: maxId + 1 };

    const updatedCampaigns = [...campaigns, campaignWithId];
    campaignStorage.saveCampaigns(updatedCampaigns);

    return campaignWithId;
  },

  // Initialize campaigns from mock data if localStorage is empty
  initializeCampaigns: (mockCampaigns: Campaign[]): Campaign[] => {
    const storedCampaigns = campaignStorage.getCampaigns();

    if (storedCampaigns.length === 0) {
      campaignStorage.saveCampaigns(mockCampaigns);
      return mockCampaigns;
    }

    return storedCampaigns;
  },
};

// Simulate API call for updating campaign
export const updateCampaignAPI = async (
  campaign: Campaign
): Promise<Campaign> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Update localStorage (simulating database update)
  campaignStorage.updateCampaign(campaign);

  // In a real app, this would also update the backend/database
  // For now, we're just using localStorage as our "database"

  return campaign;
};

// Simulate API call for creating new campaign
export const createCampaignAPI = async (
  campaignData: Omit<Campaign, "id">
): Promise<Campaign> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Add to localStorage (simulating database insert)
  const newCampaign = campaignStorage.addCampaign(campaignData);

  // Log the updated campaigns data for manual JSON file update
  const allCampaigns = campaignStorage.getCampaigns();
  console.log("Updated campaigns data for JSON file:");
  console.log(JSON.stringify(allCampaigns, null, 2));

  return newCampaign;
};

// Export function to get current campaigns data
export const exportCampaignsData = (): Campaign[] => {
  const campaigns = campaignStorage.getCampaigns();
  console.log("Current campaigns data:");
  console.log(JSON.stringify(campaigns, null, 2));
  return campaigns;
};
