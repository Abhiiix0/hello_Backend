import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  _id: "",
  name: "",
  email: "",
  profile_img: "",
  token: "",
  onlineUser: [],
  socketConnection: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    setUser: (state, action) => {
      console.log("payload", action.payload);
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_img = action.payload.profile_img;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_img = "";
      state.token = "";
      state.socketConnection = null;
    },
    setOnlineUser: (state, action) => {
      // state.onlineUser.push(payload);
      state.onlineUser = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } =
  userSlice.actions;
export default userSlice.reducer;
