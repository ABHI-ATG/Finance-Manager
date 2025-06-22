import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addDate: { month: "", year: "" },
  startDate: { month: "", year: "" },
  endDate: { month: "", year: "" },
  getStartDate: { month: "", year: "" },
  getEndDate: { month: "", year: "" },
  key: [],
  descriptionKey: [],
  parsedData: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setAddDate: (state, action) => {
      state.addDate = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setGetStartDate: (state, action) => {
      state.getStartDate = action.payload;
    },
    setGetEndDate: (state, action) => {
      state.getEndDate = action.payload;
    },
    setAddKey: (state, action) => {
      if (!state.key.includes(action.payload)) {
        state.key.push(action.payload);
      }
    },
    setAddDescriptionKey: (state, action) => {
      if (!state.descriptionKey.includes(action.payload)) {
        state.descriptionKey.push(action.payload);
      }
    },
    setParsedData: (state, action) => {
      state.parsedData = action.payload;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setGetStartDate,
  setGetEndDate,
  setAddDate,
  setAddKey,
  setAddDescriptionKey,
  setParsedData,
} = financeSlice.actions;
export default financeSlice.reducer;
