import { useState } from "react";

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

interface Creator {
  id: number;
  name: string;
  avatar: string;
  followers: string;
  niche: string;
  location: {
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  engagement: string;
  verified: boolean;
}

// Mock data - in real app, this would come from props or context
const mockCreators: Creator[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    followers: "12.5K",
    niche: "Fashion",
    location: {
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal",
      district: "Kathmandu",
      province: "Bagmati",
      coordinates: { lat: 27.7172, lng: 85.324 },
    },
    engagement: "4.2%",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "MC",
    followers: "8.2K",
    niche: "Tech",
    location: {
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
      district: "Kaski",
      province: "Gandaki",
      coordinates: { lat: 28.2096, lng: 83.9856 },
    },
    engagement: "3.8%",
    verified: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "EW",
    followers: "45.1K",
    niche: "Lifestyle",
    location: {
      city: "Lalitpur",
      state: "Bagmati",
      country: "Nepal",
      district: "Lalitpur",
      province: "Bagmati",
      coordinates: { lat: 27.6667, lng: 85.3333 },
    },
    engagement: "5.1%",
    verified: true,
  },
  {
    id: 4,
    name: "Raj Sharma",
    avatar: "RS",
    followers: "22.3K",
    niche: "Food",
    location: {
      city: "Biratnagar",
      state: "Province 1",
      country: "Nepal",
      district: "Morang",
      province: "Province 1",
      coordinates: { lat: 26.4831, lng: 87.2834 },
    },
    engagement: "4.7%",
    verified: true,
  },
  {
    id: 5,
    name: "Priya Shrestha",
    avatar: "PS",
    followers: "15.8K",
    niche: "Beauty",
    location: {
      city: "Bhaktapur",
      state: "Bagmati",
      country: "Nepal",
      district: "Bhaktapur",
      province: "Bagmati",
      coordinates: { lat: 27.671, lng: 85.4298 },
    },
    engagement: "6.3%",
    verified: true,
  },
  {
    id: 6,
    name: "Rajesh Thapa",
    avatar: "RT",
    followers: "8.7K",
    niche: "Travel & Adventure",
    location: {
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
      district: "Kaski",
      province: "Gandaki",
      coordinates: { lat: 28.2096, lng: 83.9856 },
    },
    engagement: "5.8%",
    verified: false,
  },
  {
    id: 7,
    name: "Anita Gurung",
    avatar: "AG",
    followers: "23.1K",
    niche: "Food & Cooking",
    location: {
      city: "Lalitpur",
      state: "Bagmati",
      country: "Nepal",
      district: "Lalitpur",
      province: "Bagmati",
      coordinates: { lat: 27.6667, lng: 85.3167 },
    },
    engagement: "7.3%",
    verified: true,
  },
  {
    id: 8,
    name: "Bikram Singh",
    avatar: "BS",
    followers: "15.9K",
    niche: "Fitness & Wellness",
    location: {
      city: "Biratnagar",
      state: "Province 1",
      country: "Nepal",
      district: "Morang",
      province: "Province 1",
      coordinates: { lat: 26.4834, lng: 87.2834 },
    },
    engagement: "6.1%",
    verified: true,
  },
  {
    id: 9,
    name: "Priya Shrestha",
    avatar: "PS",
    followers: "5.2K",
    niche: "Art & Design",
    location: {
      city: "Bhaktapur",
      state: "Bagmati",
      country: "Nepal",
      district: "Bhaktapur",
      province: "Bagmati",
      coordinates: { lat: 27.671, lng: 85.4298 },
    },
    engagement: "8.9%",
    verified: false,
  },
  {
    id: 10,
    name: "Amit Kumar",
    avatar: "AK",
    followers: "18.7K",
    niche: "Gaming",
    location: {
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal",
      district: "Kathmandu",
      province: "Bagmati",
      coordinates: { lat: 27.7172, lng: 85.324 },
    },
    engagement: "5.4%",
    verified: true,
  },
  {
    id: 11,
    name: "Neha Patel",
    avatar: "NP",
    followers: "32.4K",
    niche: "Education",
    location: {
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
      district: "Kaski",
      province: "Gandaki",
      coordinates: { lat: 28.2096, lng: 83.9856 },
    },
    engagement: "4.8%",
    verified: true,
  },
  {
    id: 12,
    name: "Rahul Verma",
    avatar: "RV",
    followers: "11.3K",
    niche: "Business",
    location: {
      city: "Lalitpur",
      state: "Bagmati",
      country: "Nepal",
      district: "Lalitpur",
      province: "Bagmati",
      coordinates: { lat: 27.6667, lng: 85.3333 },
    },
    engagement: "6.7%",
    verified: false,
  },
  {
    id: 13,
    name: "Sita Tamang",
    avatar: "ST",
    followers: "28.9K",
    niche: "Fashion",
    location: {
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal",
      district: "Kathmandu",
      province: "Bagmati",
      coordinates: { lat: 27.7172, lng: 85.324 },
    },
    engagement: "7.1%",
    verified: true,
  },
  {
    id: 14,
    name: "Deepak Thapa",
    avatar: "DT",
    followers: "9.6K",
    niche: "Tech",
    location: {
      city: "Biratnagar",
      state: "Province 1",
      country: "Nepal",
      district: "Morang",
      province: "Province 1",
      coordinates: { lat: 26.4831, lng: 87.2834 },
    },
    engagement: "5.2%",
    verified: false,
  },
  {
    id: 15,
    name: "Maya Gurung",
    avatar: "MG",
    followers: "41.2K",
    niche: "Lifestyle",
    location: {
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
      district: "Kaski",
      province: "Gandaki",
      coordinates: { lat: 28.2096, lng: 83.9856 },
    },
    engagement: "6.9%",
    verified: true,
  },
  {
    id: 16,
    name: "Kiran Shrestha",
    avatar: "KS",
    followers: "16.8K",
    niche: "Food",
    location: {
      city: "Bhaktapur",
      state: "Bagmati",
      country: "Nepal",
      district: "Bhaktapur",
      province: "Bagmati",
      coordinates: { lat: 27.671, lng: 85.4298 },
    },
    engagement: "5.6%",
    verified: true,
  },
  {
    id: 17,
    name: "Arjun Basnet",
    avatar: "AB",
    followers: "24.3K",
    niche: "Travel",
    location: {
      city: "Lalitpur",
      state: "Bagmati",
      country: "Nepal",
      district: "Lalitpur",
      province: "Bagmati",
      coordinates: { lat: 27.6667, lng: 85.3333 },
    },
    engagement: "7.8%",
    verified: true,
  },
  {
    id: 18,
    name: "Pooja Sharma",
    avatar: "PS",
    followers: "19.5K",
    niche: "Beauty",
    location: {
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal",
      district: "Kathmandu",
      province: "Bagmati",
      coordinates: { lat: 27.7172, lng: 85.324 },
    },
    engagement: "6.4%",
    verified: true,
  },
  {
    id: 19,
    name: "Ramesh Karki",
    avatar: "RK",
    followers: "12.7K",
    niche: "Fitness",
    location: {
      city: "Biratnagar",
      state: "Province 1",
      country: "Nepal",
      district: "Morang",
      province: "Province 1",
      coordinates: { lat: 26.4831, lng: 87.2834 },
    },
    engagement: "5.9%",
    verified: false,
  },
  {
    id: 20,
    name: "Sunita Rai",
    avatar: "SR",
    followers: "35.6K",
    niche: "Education",
    location: {
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
      district: "Kaski",
      province: "Gandaki",
      coordinates: { lat: 28.2096, lng: 83.9856 },
    },
    engagement: "8.2%",
    verified: true,
  },
  {
    id: 21,
    name: "Vikram Adhikari",
    avatar: "VA",
    followers: "14.2K",
    niche: "Gaming",
    location: {
      city: "Bhaktapur",
      state: "Bagmati",
      country: "Nepal",
      district: "Bhaktapur",
      province: "Bagmati",
      coordinates: { lat: 27.671, lng: 85.4298 },
    },
    engagement: "6.8%",
    verified: true,
  },
  {
    id: 22,
    name: "Lakshmi Magar",
    avatar: "LM",
    followers: "27.8K",
    niche: "Art",
    location: {
      city: "Lalitpur",
      state: "Bagmati",
      country: "Nepal",
      district: "Lalitpur",
      province: "Bagmati",
      coordinates: { lat: 27.6667, lng: 85.3333 },
    },
    engagement: "7.5%",
    verified: true,
  },
  {
    id: 23,
    name: "Hari Thapa",
    avatar: "HT",
    followers: "10.9K",
    niche: "Business",
    location: {
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal",
      district: "Kathmandu",
      province: "Bagmati",
      coordinates: { lat: 27.7172, lng: 85.324 },
    },
    engagement: "8.3%",
    verified: false,
  },
  {
    id: 24,
    name: "Anjali Tamang",
    avatar: "AT",
    followers: "38.4K",
    niche: "Fashion",
    location: {
      city: "Biratnagar",
      state: "Province 1",
      country: "Nepal",
      district: "Morang",
      province: "Province 1",
      coordinates: { lat: 26.4831, lng: 87.2834 },
    },
    engagement: "8.7%",
    verified: true,
  },
];

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
  const [selectedCountry, setSelectedCountry] = useState("Nepal");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedFollowers, setSelectedFollowers] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("50");
  const [searchResults, setSearchResults] = useState<Creator[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCreators = mockCreators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = creator.location.country === selectedCountry;
    const matchesProvince =
      !selectedProvince ||
      (selectedCountry === "Nepal" &&
        creator.location.province === selectedProvince);
    const matchesDistrict =
      !selectedDistrict ||
      (selectedCountry === "Nepal" &&
        creator.location.district === selectedDistrict);
    const matchesNiche = !selectedNiche || creator.niche === selectedNiche;
    const matchesFollowers =
      !selectedFollowers ||
      (() => {
        const followers = parseFloat(creator.followers.replace("K", "000"));
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

    return (
      matchesSearch &&
      matchesCountry &&
      matchesProvince &&
      matchesDistrict &&
      matchesNiche &&
      matchesFollowers
    );
  });

  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCreators = filteredCreators.slice(startIndex, endIndex);

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentPage(1); // Reset to first page on new search

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
    }, 1000);
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
    setSearchQuery("");
    setSelectedCountry("Nepal");
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedNiche("");
    setSelectedFollowers("");
    setLatitude("");
    setLongitude("");
    setRadius("50");
    setSearchResults([]);
    setCurrentPage(1);
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
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Niche
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Followers
              </label>
              <select
                value={selectedFollowers}
                onChange={(e) => setSelectedFollowers(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Followers</option>
                <option value="1K - 10K">1K - 10K</option>
                <option value="10K - 100K">10K - 100K</option>
                <option value="100K+">100K+</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Results
              </label>
              <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                {searchResults.length} creators
              </div>
            </div>
          </div>

          {/* Advanced Search */}
          {showAdvancedSearch && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </h3>

              {/* Nepal-specific filters */}
              {selectedCountry === "Nepal" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Province
                    </label>
                    <select
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      District
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                <h4 className="text-md mb-3 flex items-center gap-2 font-medium text-gray-900">
                  <Navigation className="h-4 w-4" />
                  Location-based Search
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="27.7172"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="85.3240"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Radius (km)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
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
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-slate-600"
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
                    <Button variant="emerald" size="sm" className="mt-2">
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
                    onClick={() => setCurrentPage(currentPage - 1)}
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
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
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
    </div>
  );
}
