import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polls: [],
  offset: 0,
  pages: 0,
  pollId: 0,
};

export const slice = createSlice({
  name: "polllist",
  initialState,
  reducers: {
    setPolls: (state, action) => {
      state.polls = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setPollId(state, action) {
      state.pollId = action.payload;
    },
    getDataAction() {},
    deletePollAction() {},
  },
});

export const {
  setPollId,
  setPolls,
  setOffset,
  pollId,
  setPages,
  getDataAction,
  deletePollAction,
} = slice.actions;

export default slice.reducer;
