import { createSlice } from "@reduxjs/toolkit";

const directionSlice = createSlice({
    name: "direction",
    initialState: {
        direction :"ltr" , 
        language : "en" ,
    },
    reducers: {
        ToggleDirection: (state, action) => {
        state.direction = action.payload
        } , 
        ToggleLanguage: (state, action) => {
            state.language = action.payload
        }
      },
  });
  export const { ToggleDirection  , ToggleLanguage} = directionSlice.actions;
  export default directionSlice.reducer;

  