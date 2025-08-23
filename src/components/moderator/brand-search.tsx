import { useEffect, useState } from "react";

import { Building2, Filter, Search, SlidersHorizontal, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Import mock data from JSON file
import brandMockData from "../mock-data/brand-mockdata.json";
import { BrandProfileView } from "./brand-profile-view";

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

// Use mock data from JSON file
const mockBrands: Brand[] = brandMockData;

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

const itemsPerPage = 16;

export function BrandSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVerification, setSelectedVerification] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<Brand[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Load saved search state from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedSearchState = localStorage.getItem("brand-search-state");
    if (savedSearchState) {
      try {
        const parsed = JSON.parse(savedSearchState);
        if (parsed.searchQuery) setSearchQuery(parsed.searchQuery);
        if (parsed.selectedCountry) setSelectedCountry(parsed.selectedCountry);
        if (parsed.selectedIndustry)
          setSelectedIndustry(parsed.selectedIndustry);
        if (parsed.selectedStatus) setSelectedStatus(parsed.selectedStatus);
        if (parsed.selectedVerification)
          setSelectedVerification(parsed.selectedVerification);
        if (parsed.showAdvancedSearch)
          setShowAdvancedSearch(parsed.showAdvancedSearch);
        if (parsed.currentPage) setCurrentPage(parsed.currentPage);
      } catch (e) {
        console.error("Error loading saved search state:", e);
      }
    }

    // Show all brands by default
    setTimeout(() => {
      setSearchResults(mockBrands);
    }, 100);
  }, []);

  // Save search state to localStorage whenever it changes
  const saveSearchState = () => {
    if (!mounted) return; // Don't save until mounted to prevent hydration issues

    const searchState = {
      searchQuery,
      selectedCountry,
      selectedIndustry,
      selectedStatus,
      selectedVerification,
      showAdvancedSearch,
      currentPage,
    };
    localStorage.setItem("brand-search-state", JSON.stringify(searchState));
  };

  // Update state and save to localStorage
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedCountry = (country: string) => {
    setSelectedCountry(country);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedIndustry = (industry: string) => {
    setSelectedIndustry(industry);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedStatus = (status: string) => {
    setSelectedStatus(status);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedVerification = (verification: string) => {
    setSelectedVerification(verification);
    setTimeout(saveSearchState, 0);
  };

  const updateShowAdvancedSearch = (show: boolean) => {
    setShowAdvancedSearch(show);
    setTimeout(saveSearchState, 0);
  };

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    setTimeout(saveSearchState, 0);
  };

  const handleViewProfile = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const handleCloseProfile = () => {
    setSelectedBrand(null);
  };

  const filteredBrands = mockBrands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      !selectedCountry || brand.location.country === selectedCountry;
    const matchesIndustry =
      !selectedIndustry || brand.industry === selectedIndustry;
    const matchesStatus = !selectedStatus || brand.status === selectedStatus;
    const matchesVerification =
      !selectedVerification ||
      (selectedVerification === "verified" && brand.verified) ||
      (selectedVerification === "unverified" && !brand.verified);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesIndustry &&
      matchesStatus &&
      matchesVerification
    );
  });

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  const handleSearch = () => {
    setIsSearching(true);
    updateCurrentPage(1); // Reset to first page on new search

    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(filteredBrands);
      setIsSearching(false);
      saveSearchState(); // Save the search state
    }, 500);
  };

  const clearFilters = () => {
    updateSearchQuery("");
    updateSelectedCountry("");
    updateSelectedIndustry("");
    updateSelectedStatus("");
    updateSelectedVerification("");
    setSearchResults([]);
    updateCurrentPage(1);
    saveSearchState(); // Save the cleared state
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Brand Search
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateShowAdvancedSearch(!showAdvancedSearch)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showAdvancedSearch ? "Hide" : "Advanced"} Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Search */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search brands by name, industry, or description..."
                value={searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                className="w-full border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex items-center gap-2"
              variant="emerald"
            >
              <Search className="h-4 w-4" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Basic Filters */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => updateSelectedCountry(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => updateSelectedIndustry(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => updateSelectedStatus(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Verification
              </label>
              <select
                value={selectedVerification}
                onChange={(e) => updateSelectedVerification(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Results
              </label>
              <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                {searchResults.length} brands
              </div>
            </div>
          </div>

          {/* Advanced Search */}
          {showAdvancedSearch && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company Size
                  </label>
                  <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                    <option value="">All Sizes</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Revenue Range
                  </label>
                  <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                    <option value="">All Revenue</option>
                    <option value="0-100k">$0 - $100K</option>
                    <option value="100k-1m">$100K - $1M</option>
                    <option value="1m-10m">$1M - $10M</option>
                    <option value="10m-100m">$10M - $100M</option>
                    <option value="100m+">$100M+</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Brands Available
                  </label>
                  <div className="rounded-md border border-gray-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    {mockBrands.length} brands in database
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Search Results ({searchResults.length} brands found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 font-semibold text-white">
                      {brand.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {brand.name}
                        </h3>
                        {brand.verified && (
                          <Badge
                            variant="default"
                            className="bg-green-600 text-xs"
                          >
                            Verified
                          </Badge>
                        )}
                        <Badge
                          variant={
                            brand.status === "approved"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            brand.status === "approved" ? "bg-green-600" : ""
                          }
                        >
                          {brand.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {brand.industry} • {brand.employees} employees
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {brand.location.city}, {brand.location.state},{" "}
                        {brand.location.country}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Founded: {brand.founded} • Revenue: {brand.revenue}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {brand.campaigns.length} campaigns
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {brand.billing.plan} Plan
                    </p>
                    <Button
                      variant="emerald"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleViewProfile(brand)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, searchResults.length)} of{" "}
                  {searchResults.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "emerald" : "outline"}
                        size="sm"
                        onClick={() => updateCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* No Results State */}
      {searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
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

      {/* Loading State */}
      {isSearching && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Searching for brands...</p>
          </CardContent>
        </Card>
      )}

      {/* Brand Profile View Modal */}
      {selectedBrand && (
        <BrandProfileView brand={selectedBrand} onClose={handleCloseProfile} />
      )}
    </div>
  );
}
