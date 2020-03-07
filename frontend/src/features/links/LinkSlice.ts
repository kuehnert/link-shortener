import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Link {
  name: string;
  url: string;
  description: string;
  hits: number;
  hidden: true;
  icon: string;
}

interface InitialState {
  links: Link[];
}

export const initialState: InitialState = {
  links: []
};

export const slice = createSlice({
  name: "links",
  initialState,
  reducers: {
    fetchLinks: state => {
      state.links = [];
    }
  }
});

export const { fetchLinks } = slice.actions;

export default slice.reducer;
