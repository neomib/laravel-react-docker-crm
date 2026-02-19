import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contactsList: null,
  },
  reducers: {
    setContactsList: (state, action) => {
      state.contactsList = action.payload;
    },
   
  },
});

export const { setContactsList } = contactsSlice.actions;

export default contactsSlice.reducer;
