import { useEffect, useState } from "react";

import {
  Filter,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Import mock data from JSON file
import creatorMockData from "../mock-data/creator-mockdata.json";
import { CreatorProfileView } from "./creator-profile-view";

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

// Use mock data from JSON file
const mockCreators: Creator[] = creatorMockData;

const countries = ["Nepal", "India", "USA", "UK", "Canada"];
const nepalProvinces = [
  "Bagmati",
  "Gandaki",
  "Province 1",
  "Province 2",
  "Lumbini",
  "Karnali",
  "Sudurpaschim",
];
const nepalDistricts = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Kaski",
  "Morang",
  "Sunsari",
  "Chitwan",
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

const itemsPerPage = 16;

export function CreatorSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedFollowers, setSelectedFollowers] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVerification, setSelectedVerification] = useState("");
  const [selectedCreatorScore, setSelectedCreatorScore] = useState("");
  const [creatorScoreValue, setCreatorScoreValue] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("50");
  const [searchResults, setSearchResults] = useState<Creator[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  // Load saved search state from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedSearchState = localStorage.getItem("creator-search-state");
    if (savedSearchState) {
      try {
        const parsed = JSON.parse(savedSearchState);
        if (parsed.searchQuery) setSearchQuery(parsed.searchQuery);
        if (parsed.selectedCountry) setSelectedCountry(parsed.selectedCountry);
        if (parsed.selectedProvince)
          setSelectedProvince(parsed.selectedProvince);
        if (parsed.selectedDistrict)
          setSelectedDistrict(parsed.selectedDistrict);
        if (parsed.selectedNiche) setSelectedNiche(parsed.selectedNiche);
        if (parsed.selectedFollowers)
          setSelectedFollowers(parsed.selectedFollowers);
        if (parsed.selectedStatus) setSelectedStatus(parsed.selectedStatus);
        if (parsed.selectedVerification)
          setSelectedVerification(parsed.selectedVerification);
        if (parsed.selectedCreatorScore)
          setSelectedCreatorScore(parsed.selectedCreatorScore);
        if (parsed.creatorScoreValue)
          setCreatorScoreValue(parsed.creatorScoreValue);
        if (parsed.showAdvancedSearch)
          setShowAdvancedSearch(parsed.showAdvancedSearch);
        if (parsed.latitude) setLatitude(parsed.latitude);
        if (parsed.longitude) setLongitude(parsed.longitude);
        if (parsed.radius) setRadius(parsed.radius);
        if (parsed.currentPage) setCurrentPage(parsed.currentPage);
      } catch (e) {
        console.error("Error loading saved search state:", e);
      }
    }

    // Show all creators by default
    setTimeout(() => {
      setSearchResults(mockCreators);
    }, 100);
  }, []);

  // Save search state to localStorage whenever it changes
  const saveSearchState = () => {
    if (!mounted) return; // Don't save until mounted to prevent hydration issues

    const searchState = {
      searchQuery,
      selectedCountry,
      selectedProvince,
      selectedDistrict,
      selectedNiche,
      selectedFollowers,
      selectedStatus,
      selectedVerification,
      selectedCreatorScore,
      creatorScoreValue,
      showAdvancedSearch,
      latitude,
      longitude,
      radius,
      currentPage,
    };
    localStorage.setItem("creator-search-state", JSON.stringify(searchState));
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

  const updateSelectedProvince = (province: string) => {
    setSelectedProvince(province);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedDistrict = (district: string) => {
    setSelectedDistrict(district);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedNiche = (niche: string) => {
    setSelectedNiche(niche);
    setTimeout(saveSearchState, 0);
  };

  const updateSelectedFollowers = (followers: string) => {
    setSelectedFollowers(followers);
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

  const updateSelectedCreatorScore = (score: string) => {
    setSelectedCreatorScore(score);
    setTimeout(saveSearchState, 0);
  };

  const updateCreatorScoreValue = (value: string) => {
    setCreatorScoreValue(value);
    setTimeout(saveSearchState, 0);
  };

  const updateShowAdvancedSearch = (show: boolean) => {
    setShowAdvancedSearch(show);
    setTimeout(saveSearchState, 0);
  };

  const updateLatitude = (lat: string) => {
    setLatitude(lat);
    setTimeout(saveSearchState, 0);
  };

  const updateLongitude = (lng: string) => {
    setLongitude(lng);
    setTimeout(saveSearchState, 0);
  };

  const updateRadius = (r: string) => {
    setRadius(r);
    setTimeout(saveSearchState, 0);
  };

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    setTimeout(saveSearchState, 0);
  };

  const handleViewProfile = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  const handleCloseProfile = () => {
    setSelectedCreator(null);
  };

  const filteredCreators = mockCreators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      !selectedCountry || creator.location.country === selectedCountry;
    const matchesProvince =
      !selectedProvince ||
      (selectedCountry &&
        selectedCountry === "Nepal" &&
        creator.location.province === selectedProvince);
    const matchesDistrict =
      !selectedDistrict ||
      (selectedCountry &&
        selectedCountry === "Nepal" &&
        creator.location.district === selectedDistrict);
    const matchesNiche = !selectedNiche || creator.niche === selectedNiche;

    // Fix followers filter
    const matchesFollowers =
      !selectedFollowers ||
      (() => {
        const followers = parseFloat(creator.followers.replace("K", "")) * 1000;
        switch (selectedFollowers) {
          case "1K - 10K":
            return followers >= 1000 && followers < 10000;
          case "10K - 100K":
            return followers >= 10000 && followers < 100000;
          case "100K+":
            return followers >= 100000;
          default:
            return true;
        }
      })();

    // Status filter
    const matchesStatus = !selectedStatus || creator.status === selectedStatus;

    // Verification filter
    const matchesVerification =
      !selectedVerification ||
      (selectedVerification === "verified" && creator.verified) ||
      (selectedVerification === "unverified" && !creator.verified);

    // Creator Score filter
    const matchesCreatorScore =
      !selectedCreatorScore ||
      !creatorScoreValue ||
      (() => {
        const score = creator.creatorScore;
        const value = parseInt(creatorScoreValue);
        switch (selectedCreatorScore) {
          case "equals":
            return score === value;
          case "less_than_equal":
            return score <= value;
          case "greater_than_equal":
            return score >= value;
          default:
            return true;
        }
      })();

    return (
      matchesSearch &&
      matchesCountry &&
      matchesProvince &&
      matchesDistrict &&
      matchesNiche &&
      matchesFollowers &&
      matchesStatus &&
      matchesVerification &&
      matchesCreatorScore
    );
  });

  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCreators = filteredCreators.slice(startIndex, endIndex);

  const handleSearch = () => {
    setIsSearching(true);
    updateCurrentPage(1); // Reset to first page on new search

    // Simulate API call delay
    setTimeout(() => {
      let filtered = filteredCreators;

      // Filter by radius search if coordinates provided
      if (latitude && longitude && radius) {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const radiusKm = parseFloat(radius);

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

      setSearchResults(filtered);
      setIsSearching(false);
      saveSearchState(); // Save the search state
    }, 500); // Reduced delay for better UX
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLatitude(lat.toString());
          setLongitude(lng.toString());

          // Log to console as requested
          console.log("Current Location:", {
            latitude: lat,
            longitude: lng,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString(),
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const clearFilters = () => {
    updateSearchQuery("");
    updateSelectedCountry("");
    updateSelectedProvince("");
    updateSelectedDistrict("");
    updateSelectedNiche("");
    updateSelectedFollowers("");
    updateSelectedStatus("");
    updateSelectedVerification("");
    updateSelectedCreatorScore("");
    updateCreatorScoreValue("");
    updateLatitude("");
    updateLongitude("");
    updateRadius("50");
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
              <Search className="h-5 w-5" />
              Creator Search
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
                placeholder="Search creators by name, niche, or keywords..."
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
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
                Niche
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => updateSelectedNiche(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All Niches</option>
                {niches.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Followers
              </label>
              <select
                value={selectedFollowers}
                onChange={(e) => updateSelectedFollowers(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All Followers</option>
                <option value="1K - 10K">1K - 10K</option>
                <option value="10K - 100K">10K - 100K</option>
                <option value="100K+">100K+</option>
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
                {searchResults.length} creators
              </div>
            </div>
          </div>

          {/* Creator Score Filter */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Creator Score
              </label>
              <select
                value={selectedCreatorScore}
                onChange={(e) => updateSelectedCreatorScore(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="">No Filter</option>
                <option value="equals">Equals to</option>
                <option value="less_than_equal">Less than or equal to</option>
                <option value="greater_than_equal">
                  Greater than or equal to
                </option>
              </select>
            </div>

            {selectedCreatorScore && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Score Value (0-100)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g., 80"
                  value={creatorScoreValue}
                  onChange={(e) => updateCreatorScoreValue(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Creators Available
              </label>
              <div className="rounded-md border border-gray-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                {mockCreators.length} creators in database
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

              {/* Nepal-specific filters */}
              {selectedCountry && selectedCountry === "Nepal" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Province
                    </label>
                    <select
                      value={selectedProvince}
                      onChange={(e) => updateSelectedProvince(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="">All Provinces</option>
                      {nepalProvinces.map((province) => (
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
                      value={selectedDistrict}
                      onChange={(e) => updateSelectedDistrict(e.target.value)}
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
              )}

              {/* Geocoding and Radius Search */}
              <div className="border-t pt-4">
                <h4 className="text-md mb-3 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <Navigation className="h-4 w-4" />
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
                      value={latitude}
                      onChange={(e) => updateLatitude(e.target.value)}
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
                      value={longitude}
                      onChange={(e) => updateLongitude(e.target.value)}
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
                      value={radius}
                      onChange={(e) => updateRadius(e.target.value)}
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={getCurrentLocation}
                      className="flex w-full items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Use My Location
                    </Button>
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
              <Users className="h-5 w-5" />
              Search Results ({searchResults.length} creators found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 font-semibold text-white">
                      {creator.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {creator.name}
                        </h3>
                        {creator.verified && (
                          <Badge
                            variant="default"
                            className="bg-green-600 text-xs"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {creator.niche} • {creator.followers} followers
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {creator.location.city}, {creator.location.state},{" "}
                          {creator.location.country}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {creator.engagement} engagement
                    </p>
                    <Button
                      variant="emerald"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleViewProfile(creator)}
                    >
                      View Profile
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

      {/* Loading State */}
      {isSearching && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Searching for creators...</p>
          </CardContent>
        </Card>
      )}

      {/* Creator Profile View Modal */}
      {selectedCreator && (
        <CreatorProfileView
          creator={selectedCreator}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
}
