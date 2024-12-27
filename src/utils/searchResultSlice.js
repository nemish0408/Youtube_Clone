import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    Results: [],
    FilteredResults: [],
  },
  reducers: {
    setResults: (state, action) => {
  const results = action.payload || []; // Default to an empty array if action.payload is undefined or null
  state.Results = results;
  state.FilteredResults = results;

  // Save initial FilteredResults to local storage
  localStorage.setItem("Results", JSON.stringify(state.Results));
        
    },
    setFilter: (state, action) => {
      
        state.FilteredResults = action.payload
        
// console.log(state.FilteredResults);

      // Save updated FilteredResults to local storage
      localStorage.setItem("FilteredResults", JSON.stringify(state.FilteredResults));
    },
  },
});

export const { setFilter, setResults } = searchResultSlice.actions;
export default searchResultSlice.reducer;
