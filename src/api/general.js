import http from '../utils/request'

export function login(data) {
    return http({
        url:'/login',
        method: 'post',
        data,
    })
}