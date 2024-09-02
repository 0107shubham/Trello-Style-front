// slices/usernameSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsernameState {
  value: string;
}

const initialState: UsernameState = {
  value: "",
};

const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
