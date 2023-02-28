

import {configureStore} from '@reduxjs/toolkit'
import authSclice from './redux/authSclice';


const store = configureStore({
    reducer:{
        auth:authSclice,
    }
})


export default store;