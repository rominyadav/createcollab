import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

import brandMockData from "../../mock-data/brand-mockdata.json";
import { BrandProfileView } from "../brand-profile-view";
import { SearchHeader } from "../shared";
import { filterBrands } from "../utils";
import { SearchFilters } from "./SearchFilters";
import { BrandResultItem, SearchResults } from "./SearchResults";
import { useSearchState } from "./useSearchState";

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
  status: string;
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
  submitted: string;
  campaigns: Array<{
    id: number;
    title: string;
    budget: number;
    status: string;
    startDate: string;
    endDate: string;
  }>;
}

const mockBrands: Brand[] = brandMockData;
const itemsPerPage = 16;

const initialSearchState = {
  searchQuery: "",
  selectedCountry: "",
  selectedIndustry: "",
  selectedStatus: "",
  selectedVerification: "",
  showAdvancedSearch: false,
  currentPage: 1,
};

const countries = ["Nepal", "India", "USA", "UK", "Canada"];
const industries = [
  "Technology",
  "Fashion",
  "Food & Beverage",
  "Health & Wellness",
  "Education",
  "Finance",
  "Real Estate",
  "Entertainment",
  "Sports",
  "Automotive",
  "Travel",
  "Beauty",
  "Home & Garden",
  "Pet Care",
  "Gaming",
];

export function BrandSearch() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const { state, updateState, resetState } = useSearchState({
    storageKey: "brand-search-state",
    initialState: initialSearchState,
  });

  const filteredBrands = useMemo(
    () => filterBrands(mockBrands, state),
    [state]
  );

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  const handleSearch = useCallback(() => {
    setIsSearching(true);
    updateState({ currentPage: 1 });
    setTimeout(() => setIsSearching(false), 500);
  }, [updateState]);

  const handleViewProfile = useCallback((brand: Brand) => {
    setSelectedBrand(brand);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setSelectedBrand(null);
  }, []);

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
        label: "Industry",
        value: state.selectedIndustry,
        options: [
          { value: "", label: "All Industries" },
          ...industries.map((i) => ({ value: i, label: i })),
        ],
        onChange: (value: string) => updateState({ selectedIndustry: value }),
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
        title="Brand Search"
        icon={<Icon name="building" variant="primary" />}
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
                  {filteredBrands.length} brands
                </div>
              </div>
            }
          />

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
        icon={<Icon name="building" variant="primary" />}
        results={filteredBrands}
        currentPage={state.currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => updateState({ currentPage: page })}
        renderItem={(brand) => (
          <BrandResultItem
            key={brand.id}
            brand={brand as any}
            onViewProfile={() => handleViewProfile(brand as any)}
          />
        )}
      />

      {filteredBrands.length === 0 && !isSearching && (
        <Card>
          <CardContent className="py-12 text-center">
            <Icon
              name="search"
              size="2xl"
              variant="muted"
              className="mx-auto mb-4"
            />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No brands found
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
            <p className="text-gray-600">Searching for brands...</p>
          </CardContent>
        </Card>
      )}

      {selectedBrand && (
        <BrandProfileView brand={selectedBrand} onClose={handleCloseProfile} />
      )}
    </div>
  );
}
