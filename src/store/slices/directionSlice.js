import { createSlice } from "@reduxjs/toolkit";

const directionSlice = createSlice({
    name: "direction",
    initialState: {
        direction :"ltr"
    },
    reducers: {
        ToggleDirection: (state, action) => {
        state.direction = action.payload
        }
      },
  });
  export const { ToggleDirection } = directionSlice.actions;
  export default directionSlice.reducer;

  