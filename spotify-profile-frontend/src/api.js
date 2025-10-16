import axios from 'axios'

const apiCall = async(endPoint, queryParams) => {  
    // const baseUrl = "http://127.0.0.1:8000"
    const baseUrl = "https://spotify-profiler-backend.onrender.com"
    const res = await axios.get(`${baseUrl}${endPoint}${queryParams}`)
    return res
}

export default apiCall