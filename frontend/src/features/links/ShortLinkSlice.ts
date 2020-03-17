import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lsApi from "apis/lsApi";
import { requestFailed } from "features/users/UserSlice";
import { AppThunk } from "store";
import { authHeaders } from "utils/authHeader";
import { setAlert } from "../globals/GlobalSlice";

export interface ShortLink extends ShortLinkBase {
  id: string;
  hits: number;
  icon?: string;
}

export interface ShortLinkBase {
  shortname: string;
  title: string;
  weburl: string;
  description: string;
  hidden: boolean;
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
    clickShortLinkSuccess(state, action: PayloadAction<ShortLink>) {
      const index = state.list.findIndex(l => l.id === action.payload.id);
      if (index >= 0) {
        state.list[index].hits += 1;
      }
    },
    fetchShortLinksSuccess(state, action: PayloadAction<ShortLink[]>) {
      state.list = action.payload;
    },
    createShortLinkSuccess(state, action: PayloadAction<ShortLink>) {
      state.list.push(action.payload);
      state.list.sort((a: ShortLink, b: ShortLink) =>
        a.title.localeCompare(b.title)
      );
    },
    deleteShortLinkSuccess(state, action: PayloadAction<string>) {
      const index = state.list.findIndex(l => l.id === action.payload);
      if (index >= 0) {
        state.list.splice(index, 1);
      }
    },
    updateShortLinkSuccess(state, action: PayloadAction<ShortLink>) {
      const shortLink = action.payload;
      const index = state.list.findIndex(l => l.id === shortLink.id);
      if (index >= 0) {
        state.list[index] = shortLink;
      }
    }
  }
});

export const {
  clickShortLinkSuccess,
  createShortLinkSuccess,
  deleteShortLinkSuccess,
  fetchShortLinksSuccess,
  updateShortLinkSuccess
} = slice.actions;
export default slice.reducer;

export const fetchShortLinks = (): AppThunk => async dispatch => {
  let shortLinks;
  try {
    const response = await lsApi.get(`/shortlinks`);
    shortLinks = response.data;
  } catch (error) {
    dispatch(
      setAlert({
        type: "error",
        message: `Fehler beim Laden der Shortlinks.`
      })
    );
    return;
  }

  dispatch(fetchShortLinksSuccess(shortLinks));
};

export const createShortLink = (
  values: ShortLinkBase
): AppThunk => async dispatch => {
  let shortLink;

  try {
    const response = await lsApi.post(`/shortlinks`, values, authHeaders());
    shortLink = response.data;
  } catch (error) {
    dispatch(
      requestFailed({
        resourceType: "shortlinks",
        resources: [values.shortname],
        status: error.response.status,
        message: error.response.message
      })
    );
    return;
  }

  dispatch(createShortLinkSuccess(shortLink));
};

export const updateShortLink = (
  values: ShortLink
): AppThunk => async dispatch => {
  let shortLink;

  try {
    const response = await lsApi.patch(
      `/shortlinks/${values.id}`,
      values,
      authHeaders()
    );
    shortLink = response.data;
  } catch (error) {
    dispatch(
      requestFailed({
        resourceType: "shortlinks",
        resources: [values.shortname],
        status: error.response.status,
        message: error.response.message
      })
    );
    return;
  }

  dispatch(updateShortLinkSuccess(shortLink));
};

export const deleteShortLink = (
  link: ShortLink
): AppThunk => async dispatch => {
  try {
    await lsApi.delete(`/shortlinks/${link.id}`, authHeaders());
  } catch (error) {
    dispatch(
      setAlert({
        type: "error",
        message: `Fehler beim Löschen von Shortlink "${link.title}".`
      })
    );
    return;
  }

  dispatch(
    setAlert({
      type: "warning",
      message: `Shortlink "${link.title}" gelöscht.`
    })
  );
  dispatch(deleteShortLinkSuccess(link.id));
};

export const repairShortLinks = (): AppThunk => async dispatch => {
  try {
    await lsApi.post(`/shortlinks/repair`, null, authHeaders());
    await dispatch(fetchShortLinks());
    dispatch(
      setAlert({ type: "info", message: "ShortLinks erfolgreich repariert" })
    );
  } catch (error) {
    dispatch(
      setAlert({
        type: "error",
        message: "ShortLinks konnten nicht repariert werden"
      })
    );
  }
};

export const clickShortLink = (link: ShortLink): AppThunk => async dispatch => {
  try {
    await lsApi.post(`/shortlinks/${link.id}/click`, null, authHeaders());
    dispatch(clickShortLinkSuccess(link));
  } catch (error) {
    dispatch(
      setAlert({
        type: "error",
        message: "ShortLink Klicks konnten nicht erhöht werden."
      })
    );
  }
};
