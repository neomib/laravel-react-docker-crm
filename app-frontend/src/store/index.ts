import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import contactsReducer from "./contactsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
});
