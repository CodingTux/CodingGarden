import { REGISTER_ENDPOINT, FETCH_FILES, UPLOAD_ENDPOINT } from "./constants"

export const RegisterUser = (userId: String) => {
    return new Promise((resolve, reject) => {
        fetch(`${REGISTER_ENDPOINT}/${userId}`).then(data => data.json()).then((data) => resolve(data)).catch(err => reject(err))
    })
}

export const FetchFiles = (userId: String) => {
    return new Promise((resolve, reject) => {
        fetch(`${FETCH_FILES}/${userId}`).then(data => data.json()).then((data) => resolve(data)).catch(err => reject(err))
    })
}

export const UploadFiles = (userId: String, files: Array<any>) => {
    return new Promise((resolve, reject) => {
        fetch(`${UPLOAD_ENDPOINT}`, {
            method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                files
            })
        }).then(data => data.json()).then((data) => resolve(data)).catch(err => reject(err))
    })
}


export default {
    API: {
        RegisterUser,
        FetchFiles,
        UploadFiles
    }
}