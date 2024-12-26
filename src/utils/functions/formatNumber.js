export const FormatNumber = (num) => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`; // Format millions
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`; // Format thousands
    }
    return num.toString(); // Return as is for smaller numbers
  };