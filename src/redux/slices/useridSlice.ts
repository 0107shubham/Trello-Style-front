// slices/useridSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UseridState {
  value: string;
}

const initialState: UseridState = {
  value: "",
};

const useridSlice = createSlice({
  name: "userid",
  initialState,
  reducers: {
    setUserid: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserid } = useridSlice.actions;
export default useridSlice.reducer;
