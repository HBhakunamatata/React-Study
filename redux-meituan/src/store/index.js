import foodReducer from "./modules/takeaway";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore( {
    reducer: {
        food: foodReducer
    }
})

export default store 