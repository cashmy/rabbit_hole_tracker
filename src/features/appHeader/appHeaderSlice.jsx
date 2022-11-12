import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  componentTitle: 'App Header',
}

export const appHeaderSlice = createSlice({
  name: 'appHeader',
  initialState,
  reducers: {
    updateComponentTitle: (state, action) => {
      state.componentTitle = action.payload;
    }
  }
})

export const { updateComponentTitle } = appHeaderSlice.actions;

export default appHeaderSlice.reducer;
