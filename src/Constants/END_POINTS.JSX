const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1'
const BASE_USER = `${BASE_URL}/users`

export const AUTH_URLs = {
    login: `${BASE_USER}/login`,
    register: `${BASE_USER}/register`,
    forgot: `${BASE_USER}/forgot`,
    reset: `${BASE_USER}/reset`,
    verify: `${BASE_USER}/verify`
}