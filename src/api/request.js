import axios from 'axios'
// import { Message } from 'element-ui'

const http = axios.create({
    baseURL: 'http://192.168.43.224:8080',
    timeout: 1000000,
})

http.interceptors.request.use((config) => {
    config.headers['token']=localStorage.getItem('token')
    return config;
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use((response) => {
    // if (response.data.code === 200) {
    //     Message({
    //         message: response.data.msg,
    //         type: 'success',
    //         duration:1500
    //     })
    // }
    // if (response.data.code !== 200) {
    //     Message({
    //         message: response.data.msg,
    //         type: 'warning',
    //         duration:1500
    //     })
    // }
    return response
}, function (error) {
    return error
})

export default http