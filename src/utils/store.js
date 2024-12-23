import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchResultSlice from "./searchResultSlice"
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    app: appSlice,
    searchResult: searchResultSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
