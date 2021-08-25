
export const apiBaseUrl = 'https://strofesapps.live/challenge/';

const request = (method, endpoint, secretToken, body) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': secretToken
    }
    const payload = {
        method,
        headers
    }
    if (method !== 'GET' || method !== 'DELETE') {
        payload.body = JSON.stringify(body)
    }

    return fetch(apiBaseUrl + endpoint, payload).then(res => res.json())
}


export const getDoc = (url, secretToken) => {
    return request('GET', url, secretToken)
}
export const postDoc = (url, secretToken, body) => {
    return request('POST', url, secretToken, body)
}
export const putDoc = (url, secretToken, body) => {
    return request('PUT', url, secretToken, body)
}
export const deleteDoc = (url, secretToken) => {
    return request('DELETE', url, secretToken)
}
