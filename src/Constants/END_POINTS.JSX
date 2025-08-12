export const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1'
const BASE_USER = `${BASE_URL}/users`

export const AUTH_URLs = {
    login: `${BASE_USER}/login`,
    register: `${BASE_USER}/register`,
    forgot: `${BASE_USER}/reset/request`,
    reset: `${BASE_USER}/reset`,
    verify: `${BASE_USER}/verify`
}

export const Categ_URLs = {
    all: `${BASE_URL}/category`,
    // oneCateg: `${BASE_URL}/register`
}

export const Recipes_URLs = {
    all: `${BASE_URL}/recipe`,
    // oneCateg: `${BASE_URL}/register`
}

export const Tags_URLs = {
    all: `${BASE_URL}/tag`,
}