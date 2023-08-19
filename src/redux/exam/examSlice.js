import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pc: {},
};

export const pcBuilderSlice = createSlice({
  name: "pcBuilder",
  initialState,
  reducers: {
    addComponent: (state, action) => {
      state.pc = { ...state.pc, [action?.payload?.category]: action?.payload };
    },
  },
});

export const { addComponent } = pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;
