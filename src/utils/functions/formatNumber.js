export const FormatNumber = (num) => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`; // Format millions
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`; // Format thousands
    }else if (num === undefined || num === null){
      return "0"
    }
    return num.toString(); // Return as is for smaller numbers
  };