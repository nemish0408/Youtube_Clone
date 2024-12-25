import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    Results: [],
    FilteredResults: [],
  },
  reducers: {
    setResults: (state, action) => {
      state.Results = action.payload;
      state.FilteredResults = action.payload;

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
