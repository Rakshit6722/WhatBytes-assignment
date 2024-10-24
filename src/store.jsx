import { configureStore } from "@reduxjs/toolkit";
import userScores from './slice/slice.jsx'

const store = configureStore({
    reducer: {
        "user": userScores
    }
})

export default store