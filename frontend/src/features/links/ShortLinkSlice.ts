import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShortLink {
  shortname: string;
  title: string;
  weburl: string;
  description: string;
  hits: number;
  hidden: boolean;
  icon: string;
}

interface InitialState {
  list: ShortLink[];
}

export const initialState: InitialState = {
  list: []
};

export const slice = createSlice({
  name: "shortlinks",
  initialState,
  reducers: {
    fetchShortLinks: state => {
      state.list = [];
    }
  }
});

export const { fetchShortLinks } = slice.actions;

export default slice.reducer;
