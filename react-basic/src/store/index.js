import counterReducer from "./modules/counterStore";
import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./modules/channelStore";

const store = configureStore(
    {
        reducer: {
            counter: counterReducer,
            channel: channelReducer,
        }
    }
)

export default store
