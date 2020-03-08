import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "@material-ui/lab";
// import { RootState } from '../../app/rootReducer';

type GlobalSliceState = {
  alerts: {
    [key: string]: string;
  };
  pageTitle: string | null;
};

const initialState = { alerts: {}, pageTitle: null };

export const globalSlice = createSlice({
  name: "globals",
  initialState: initialState as GlobalSliceState,
  reducers: {
    setAlert(state, action: PayloadAction<{ type: Color; message: string }>) {
      const { type, message } = action.payload;
      state.alerts[type] = message;
    },
    clearAlert(state, action: PayloadAction<Color>) {
      delete state.alerts[action.payload];
    },
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle = action.payload;
      document.title = action.payload;
    }
  }
});

export const { setAlert, clearAlert, setPageTitle } = globalSlice.actions;

export default globalSlice.reducer;
