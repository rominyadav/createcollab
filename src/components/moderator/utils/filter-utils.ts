interface Creator {
  id: number;
  name: string;
  niche: string;
  followers: string;
  status: string;
  verified: boolean;
  creatorScore: number;
  location: {
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
}

interface Brand {
  id: number;
  name: string;
  industry: string;
  description: string;
  status: string;
  verified: boolean;
  location: {
    country: string;
  };
}

export const filterCreators = (
  creators: Creator[],
  filters: {
    searchQuery: string;
    selectedCountry: string;
    selectedProvince: string;
    selectedDistrict: string;
    selectedNiche: string;
    selectedFollowers: string;
    selectedStatus: string;
    selectedVerification: string;
    selectedCreatorScore: string;
    creatorScoreValue: string;
  }
): Creator[] => {
  return creators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesCountry =
      !filters.selectedCountry ||
      creator.location.country === filters.selectedCountry;
    const matchesProvince =
      !filters.selectedProvince ||
      (filters.selectedCountry === "Nepal" &&
        creator.location.province === filters.selectedProvince);
    const matchesDistrict =
      !filters.selectedDistrict ||
      (filters.selectedCountry === "Nepal" &&
        creator.location.district === filters.selectedDistrict);
    const matchesNiche =
      !filters.selectedNiche || creator.niche === filters.selectedNiche;

    const matchesFollowers =
      !filters.selectedFollowers ||
      (() => {
        const followers = parseFloat(creator.followers.replace("K", "")) * 1000;
        switch (filters.selectedFollowers) {
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

    const matchesStatus =
      !filters.selectedStatus || creator.status === filters.selectedStatus;
    const matchesVerification =
      !filters.selectedVerification ||
      (filters.selectedVerification === "verified" && creator.verified) ||
      (filters.selectedVerification === "unverified" && !creator.verified);

    const matchesCreatorScore =
      !filters.selectedCreatorScore ||
      !filters.creatorScoreValue ||
      (() => {
        const score = creator.creatorScore;
        const value = parseInt(filters.creatorScoreValue);
        switch (filters.selectedCreatorScore) {
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
};

export const filterBrands = (
  brands: Brand[],
  filters: {
    searchQuery: string;
    selectedCountry: string;
    selectedIndustry: string;
    selectedStatus: string;
    selectedVerification: string;
  }
): Brand[] => {
  return brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      brand.industry
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      brand.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    const matchesCountry =
      !filters.selectedCountry ||
      brand.location.country === filters.selectedCountry;
    const matchesIndustry =
      !filters.selectedIndustry || brand.industry === filters.selectedIndustry;
    const matchesStatus =
      !filters.selectedStatus || brand.status === filters.selectedStatus;
    const matchesVerification =
      !filters.selectedVerification ||
      (filters.selectedVerification === "verified" && brand.verified) ||
      (filters.selectedVerification === "unverified" && !brand.verified);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesIndustry &&
      matchesStatus &&
      matchesVerification
    );
  });
};
