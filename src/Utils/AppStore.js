import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";


const AppStore = configureStore({
    reducer: {
        users: userReducer,
    }
});


export default AppStore;