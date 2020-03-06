import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Link {
  name: string;
  url: string;
  description: string;
  hits: number;
}

interface InitialState {
  value: number;
}

export const initialState: InitialState = {
  value: 0
};

export const slice = createSlice({
  name: "links",
  initialState,
  reducers: {
    fetchLinks: state => {}
  }
});

export const { fetchLinks } = slice.actions;

export default slice.reducer;
