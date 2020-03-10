import { createSlice } from "@reduxjs/toolkit";

export interface ShortLink {
  shortname: string;
  title: string;
  weburl: string;
  description: string;
  hits: number;
  hidden: boolean;
  icon: string | null;
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
      state.list = [
        {
          shortname: "home",
          title: "Marienschule Homepage",
          weburl: "https://www.marienschule.com",
          description: "Unsere Homepage",
          hits: 0,
          hidden: false,
          icon: null
        }
      ];
    }
  }
});

export const { fetchShortLinks } = slice.actions;

export default slice.reducer;
