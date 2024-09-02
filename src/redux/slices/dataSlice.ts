// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// const userId = Cookies.get("userId") || null;

// // Async thunk for fetching data
// export const fetchData = createAsyncThunk("data/fetchData", async () => {
//   const response = await axios.post(
//     "https://trello-style-back.vercel.app/getposts",
//     userId
//   );
//   return response.data; // Axios returns data under `data` property
// });

// // Async thunk for creating data
// export const createData = createAsyncThunk(
//   "data/createData",
//   async (newData) => {
//     const response = await axios.post("/api/data", newData);
//     return response.data; // Return the created data
//   }
// );

// // Async thunk for deleting data
// export const deleteData = createAsyncThunk("data/deleteData", async (id) => {
//   await axios.delete(`/api/data/${id}`);
//   return id; // Return the deleted item's ID
// });

// // Async thunk for updating data
// export const updateData = createAsyncThunk(
//   "data/updateData",
//   async (updatedData) => {
//     await axios.put(`/api/data/${updatedData.id}`, updatedData);
//     return updatedData; // Return the updated data
//   }
// );

// const dataSlice = createSlice({
//   name: "data",
//   initialState: {
//     items: [],
//     status: "idle",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchData.rejected, (state) => {
//         state.status = "failed";
//       })
//       .addCase(createData.fulfilled, (state, action) => {
//         state.items.push(action.payload); // Add the newly created item to state
//       })
//       .addCase(deleteData.fulfilled, (state, action) => {
//         state.items = state.items.filter((item) => item.id !== action.payload); // Remove the deleted item
//       })
//       .addCase(updateData.fulfilled, (state, action) => {
//         console.log("data", state);

//         const index = state.items.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload; // Update the item
//         }
//       });
//   },
// });

// export default dataSlice.reducer;
