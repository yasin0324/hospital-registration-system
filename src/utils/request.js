import axios from 'axios'

const http = axios.create({
    baseURL: 'http://192.168.76.47:8080',
    timeout: 1000000,
})

http.interceptors.request.use((config) => {
    config.headers['token']=localStorage.getItem('token')
    return config;
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return error
})

export default http