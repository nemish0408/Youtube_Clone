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
      console.log(state.Results);

      // Initially, filteredItems are the same as items
    },
    setFilter: (state, action) => {
      const filterText = action.payload.toLowerCase();
      if(filterText===''){
        state.FilteredResults=state.Results
      }else{
      state.FilteredResults = state.Results.filter(
        (item) => item.snippet.title.toLowerCase().includes(filterText))}
  },
}});

export const { setFilter, setResults } = searchResultSlice.actions;
export default searchResultSlice.reducer;
