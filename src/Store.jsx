import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import loginReducer from "./pages/LoginSlice";
import RegisterReducer from './pages/RegisterSlice';

const store=configureStore({

    reducer:{
        login: loginReducer,
        register:RegisterReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default store;

