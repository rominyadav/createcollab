import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

import creatorMockData from "../../mock-data/creator-mockdata.json";
import { CreatorProfileView } from "../creator-profile-view";
import { SearchHeader } from "../shared";
import {
  calculateDistance,
  filterCreators,
  getCurrentLocation,
} from "../utils";
import { SearchFilters } from "./SearchFilters";
import { CreatorResultItem, SearchResults } from "./SearchResults";
import { useSearchState } from "./useSearchState";

interface Creator {
  id: number;
  name: string;
  avatar: string;
  followers: string;
  following: string;
  niche: string;
  email: string;
  bio: string;
  socialLinks: string[];
  pricing: Record<
    string,
    { type: string; amount?: number; min?: number; max?: number }
  >;
  shippingAddress: string;
  profileCompletion: string;
  status: string;
  verified: boolean;
  panCard: string;
  paymentVerification: {
    khalti: string;
    esewa: string;
    verified: boolean;
  };
  creatorScore: number;
  location: {
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
  engagement: string;
  videos: Array<{
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    likes: string;
    uploadedAt: string;
  }>;
}

const mockCreators: Creator[] = creatorMockData;
const itemsPerPage = 16;

const initialSearchState = {
  searchQuery: "",
  selectedCountry: "",
  selectedProvince: "",
  selectedDistrict: "",
  selectedNiche: "",
  selectedFollowers: "",
  selectedStatus: "",
  selectedVerification: "",
  selectedCreatorScore: "",
  creatorScoreValue: "",
  showAdvancedSearch: false,
  currentPage: 1,
  latitude: "",
  longitude: "",
  radius: "10",
};

const countries = ["Nepal", "India", "USA", "UK", "Canada"];
const provinces = [
  "Bagmati",
  "Gandaki",
  "Province 1",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
  "Madhesh",
];
const nepalDistricts = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Kaski",
  "Morang",
  "Chitwan",
  "Rupandehi",
  "Banke",
  "Kailali",
  "Dang",
];
const niches = [
  "Fashion",
  "Tech",
  "Lifestyle",
  "Food",
  "Travel",
  "Fitness",
  "Beauty",
  "Gaming",
  "Education",
  "Business",
  "Art",
];

export function CreatorSearch() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const { state, updateState, resetState } = useSearchState({
    storageKey: "creator-search-state",
    initialState: initialSearchState,
  });

  const filteredCreators = useMemo(() => {
    let filtered = filterCreators(mockCreators, state);

    // Apply geo-location filtering if coordinates are provided
    if (state.latitude && state.longitude && state.radius) {
      const lat = parseFloat(state.latitude);
      const lng = parseFloat(state.longitude);
      const radiusKm = parseFloat(state.radius);

      if (!isNaN(lat) && !isNaN(lng) && !isNaN(radiusKm)) {
        filtered = filtered.filter((creator) => {
          if (!creator.location.coordinates) return false;
          const distance = calculateDistance(
            lat,
            lng,
            creator.location.coordinates.lat,
            creator.location.coordinates.lng
          );
          return distance <= radiusKm;
        });
      }
    }

    return filtered;
  }, [state]);

  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);

  const handleSearch = useCallback(() => {
    setIsSearching(true);
    updateState({ currentPage: 1 });
    setTimeout(() => setIsSearching(false), 500);
  }, [updateState]);

  const handleViewProfile = useCallback((creator: Creator) => {
    setSelectedCreator(creator);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setSelectedCreator(null);
  }, []);

  const handleGetCurrentLocation = useCallback(() => {
    getCurrentLocation()
      .then((location) => {
        updateState({
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
        });
      })
      .catch((error) => {
        console.error("Failed to get location:", error);
      });
  }, [updateState]);

  const clearFilters = useCallback(() => {
    resetState();
  }, [resetState]);

  const searchFilters = useMemo(
    () => [
      {
        label: "Country",
        value: state.selectedCountry,
        options: [
          { value: "", label: "All Countries" },
          ...countries.map((c) => ({ value: c, label: c })),
        ],
        onChange: (value: string) => updateState({ selectedCountry: value }),
      },
      {
        label: "Niche",
        value: state.selectedNiche,
        options: [
          { value: "", label: "All Niches" },
          ...niches.map((n) => ({ value: n, label: n })),
        ],
        onChange: (value: string) => updateState({ selectedNiche: value }),
      },
      {
        label: "Followers",
        value: state.selectedFollowers,
        options: [
          { value: "", label: "All Followers" },
          { value: "1K - 10K", label: "1K - 10K" },
          { value: "10K - 100K", label: "10K - 100K" },
          { value: "100K+", label: "100K+" },
        ],
        onChange: (value: string) => updateState({ selectedFollowers: value }),
      },
      {
        label: "Status",
        value: state.selectedStatus,
        options: [
          { value: "", label: "All Status" },
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
          { value: "blocked", label: "Blocked" },
        ],
        onChange: (value: string) => updateState({ selectedStatus: value }),
      },
      {
        label: "Verification",
        value: state.selectedVerification,
        options: [
          { value: "", label: "All" },
          { value: "verified", label: "Verified" },
          { value: "unverified", label: "Unverified" },
        ],
        onChange: (value: string) =>
          updateState({ selectedVerification: value }),
      },
    ],
    [state, updateState]
  );

  return (
    <div className="space-y-6">
      <SearchHeader
        title="Creator Search"
        icon={<Icon name="search" variant="primary" />}
        showAdvancedSearch={state.showAdvancedSearch}
        onToggleAdvanced={() =>
          updateState({ showAdvancedSearch: !state.showAdvancedSearch })
        }
        onClearFilters={clearFilters}
      />

      <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
        <CardContent className="space-y-4 pt-6">
          <SearchFilters
            searchQuery={state.searchQuery}
            onSearchChange={(query) => updateState({ searchQuery: query })}
            filters={searchFilters}
            additionalInfo={
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Results
                </label>
                <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  {filteredCreators.length} creators
                </div>
              </div>
            }
          />

          {state.showAdvancedSearch && (
            <div className="space-y-4">
              {/* Nepal Location Filters */}
              {state.selectedCountry === "Nepal" && (
                <div className="border-t pt-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    <Icon name="map-pin" size="sm" />
                    Nepal Location Filters
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Province
                      </label>
                      <select
                        value={state.selectedProvince}
                        onChange={(e) =>
                          updateState({ selectedProvince: e.target.value })
                        }
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="">All Provinces</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        District
                      </label>
                      <select
                        value={state.selectedDistrict}
                        onChange={(e) =>
                          updateState({ selectedDistrict: e.target.value })
                        }
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="">All Districts</option>
                        {nepalDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Location-based Search */}
              <div className="border-t pt-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  <Icon name="navigation" size="sm" />
                  Location-based Search
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Latitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="27.7172"
                      value={state.latitude}
                      onChange={(e) =>
                        updateState({ latitude: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Longitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="85.3240"
                      value={state.longitude}
                      onChange={(e) =>
                        updateState({ longitude: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Radius (km)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      value={state.radius}
                      onChange={(e) => updateState({ radius: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={handleGetCurrentLocation}
                      className="flex w-full items-center gap-2"
                    >
                      <Icon name="map-pin" size="sm" />
                      Use My Location
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex items-center gap-2"
              variant="emerald"
            >
              <Icon name="search" size="sm" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <SearchResults
        title="Search Results"
        icon={<Icon name="users" variant="primary" />}
        results={filteredCreators}
        currentPage={state.currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => updateState({ currentPage: page })}
        renderItem={(creator) => (
          <CreatorResultItem
            key={creator.id}
            creator={creator}
            onViewProfile={() => handleViewProfile(creator)}
          />
        )}
      />

      {filteredCreators.length === 0 && !isSearching && (
        <Card>
          <CardContent className="py-12 text-center">
            <Icon
              name="search"
              size="2xl"
              variant="muted"
              className="mx-auto mb-4"
            />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No creators found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
            <Button variant="emerald" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {isSearching && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Searching for creators...</p>
          </CardContent>
        </Card>
      )}

      {selectedCreator && (
        <CreatorProfileView
          creator={selectedCreator}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
}
