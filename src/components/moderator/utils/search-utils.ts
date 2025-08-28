export const parseFollowers = (followersStr: string): number => {
  return parseFloat(followersStr.replace("K", "")) * 1000;
};

export const matchesFollowersRange = (
  followers: string,
  selectedRange: string
): boolean => {
  if (!selectedRange) return true;

  const followerCount = parseFollowers(followers);
  switch (selectedRange) {
    case "1K - 10K":
      return followerCount >= 1000 && followerCount < 10000;
    case "10K - 100K":
      return followerCount >= 10000 && followerCount < 100000;
    case "100K+":
      return followerCount >= 100000;
    default:
      return true;
  }
};

export const matchesCreatorScore = (
  score: number,
  selectedScore: string,
  scoreValue: string
): boolean => {
  if (!selectedScore || !scoreValue) return true;

  const value = parseInt(scoreValue);
  switch (selectedScore) {
    case "equals":
      return score === value;
    case "less_than_equal":
      return score <= value;
    case "greater_than_equal":
      return score >= value;
    default:
      return true;
  }
};

export const matchesTextSearch = (
  searchQuery: string,
  ...fields: string[]
): boolean => {
  if (!searchQuery) return true;
  const query = searchQuery.toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(query));
};
