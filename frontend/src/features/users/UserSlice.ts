import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decode } from "jsonwebtoken";
import lsApi from "../../apis/lsApi";
import { AppThunk, RootState } from "../../store";
import { authHeaders } from "../../utils/authHeader";
import { setAlert } from "../globals/GlobalSlice";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface SignUpValues {
  firstname: string;
  lastname: string;
  email: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export const defaultUser = {
  id: "",
  firstname: "",
  lastname: "",
  email: ""
};

export interface UserState {
  isLoggedIn: boolean;
  isRequesting: boolean;
  user: User | null;
  error: string | null;
}

export interface UnauthorizedPayload {
  resourceType: string;
  resources: string[];
  status: number;
  message: string;
}

// TODO: check token
// ASKMAX: sehr hässlich, wo muss das hin?
let user;
console.log("userSlice: loading user from storage...");
try {
  const storedUser = localStorage.getItem("user");
  user = storedUser != null ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");

  if (token) {
    const decoded: any = decode(token);

    if (Date.now() >= decoded.exp * 1000) {
      console.log("token expired");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      user = null;
    }
  }
} catch (error) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  user = null;
}

const initialState: UserState = {
  isLoggedIn: user == null ? false : true,
  isRequesting: false,
  user,
  error: null
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = action.payload != null;
      state.error = null;
      state.isRequesting = false;
    },
    signUpSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = action.payload != null;
      state.error = null;
      state.isRequesting = false;
    },
    logoutFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.user = null;
      state.isLoggedIn = false;
      state.isRequesting = false;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.isRequesting = false;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    submitting(state) {
      state.isRequesting = true;
    },
    requestFailed(state, action: PayloadAction<UnauthorizedPayload>) {
      // console.log('state:', state);
      // console.log('action:', action);
      const code = action.payload.status;

      if (code === 401 || code === 403) {
        // Unauthorized
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      } else {
        state.error = action.payload.message;
      }
      state.isRequesting = false;
    }
  }
});

export const {
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  requestFailed,
  signUpSuccess,
  submitting,
  updateUserSuccess
} = userSlice.actions;

export default userSlice.reducer;

export const login = (values: LoginValues): AppThunk => async dispatch => {
  dispatch(submitting());
  let user, token;
  try {
    const response = await lsApi.post("/users/login", values);
    user = response.data.user;
    token = response.data.token;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } catch ({ response }) {
    dispatch(
      requestFailed({
        resourceType: "users",
        resources: [],
        status: response.status,
        message: response.message
      })
    );
    dispatch(
      setAlert({
        type: "error",
        message:
          "Beim Anmelden gab es einen Fehler. Bitte probieren Sie es später noch einmal."
      })
    );
    return;
  }

  dispatch(loginSuccess(user));
  dispatch(
    setAlert({
      type: "success",
      message: "Sie haben sich erfolgreich angemeldet."
    })
  );
};

export const logout = (): AppThunk => async dispatch => {
  try {
    await lsApi.post("/users/logout", null, authHeaders());
  } catch ({ response }) {
    dispatch(logoutFailed(response));
    return;
  } finally {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  dispatch(logoutSuccess());
  dispatch(
    setAlert({
      type: "success",
      message: "Sie haben sich erfolgreich abgemeldet."
    })
  );
};

export const signUp = (values: SignUpValues): AppThunk => async dispatch => {
  dispatch(submitting());
  let user, token;

  try {
    const response = await lsApi.post("/users", values);
    user = response.data.user;
    token = response.data.token;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } catch ({ response }) {
    // dispatch(
    //   requestFailed({
    //     resourceType: "users",
    //     resources: [],
    //     status: response.status,
    //     message: response.message
    //   })
    // );

    dispatch(
      setAlert({
        type: "error",
        message: `Fehler beim Anlegen des Kontos. ${response.status} ${response.message}`
      })
    );
    return;
  }

  dispatch(signUpSuccess(user));
  dispatch(
    setAlert({
      type: "success",
      message:
        "Ihr Konto wurde erfolgreich erstellt. Willkommen beim Link Shortener!"
    })
  );
};

export const updateUser = (values: User): AppThunk => async dispatch => {
  dispatch(submitting());
  let user;

  try {
    const response = await lsApi.patch(
      `/users/${values.id}`,
      values,
      authHeaders()
    );
    user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
  } catch ({ response }) {
    dispatch(
      requestFailed({
        resourceType: "users",
        resources: [],
        status: response.status,
        message: response.message
      })
    );
    return;
  }

  dispatch(updateUserSuccess(user));
};

/**
 * SELECTORS
 */
export const getUser = (state: RootState) => state.users.user;
