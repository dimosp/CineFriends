export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))
}

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))
}

export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))
}

export const update = (userId, token, userdata) => {
    console.log('userdata', userdata)
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },       
        body: userdata
    })
        .then(response => {
            console.log("response", response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateUser = (user, next) => {

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            console.log('user', user)
            console.log('auth.user', auth.user)

            auth.user = user;
            auth.user.photo = user.photo

            localStorage.setItem('jwt', JSON.stringify(auth))
            next();
        }
    }
}