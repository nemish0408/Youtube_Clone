import { createSlice } from "@reduxjs/toolkit";
import { SEARCH_VIDEO_URL, SEARCH_VIDEO_URL_EXT } from "./constants";

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
      localStorage.setItem("FilteredResults", JSON.stringify(state.FilteredResults));
    },
    setFilter: (state, action) => {
      const filterText = action.payload.toLowerCase();
      if (filterText === "") {
        state.FilteredResults = state.Results;
      } else {
        state.FilteredResults = async()=>{
          const searchUrl = `${SEARCH_VIDEO_URL}${filterText}${SEARCH_VIDEO_URL_EXT}`;
          const response = await fetch(searchUrl)
          console.log(response.json());
          
            return response.json()

          
        }
      }

      // Save updated FilteredResults to local storage
      localStorage.setItem("FilteredResults", JSON.stringify(state.FilteredResults));
    },
  },
});

export const { setFilter, setResults } = searchResultSlice.actions;
export default searchResultSlice.reducer;
