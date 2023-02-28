
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/";

// SignUp user

const register = async(userData)=>{
    const {data} = axios.post(`${API_URL}/signup`, userData)
    if(data){
        localStorage.setItem('user',JSON.stringify(data))
    }
    return data
}

export {register}

