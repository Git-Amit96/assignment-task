import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action) => {
      const { id, bio } = action.payload;
      state.users = state.users.map((user) =>
        user.id === id ? { ...user, bio } : user
      );
    },
  },
});

export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;