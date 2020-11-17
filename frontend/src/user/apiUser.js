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
    console.log("USER DATA:" , 
    
    JSON.stringify({
        name: userdata.get('name'),
        email: userdata.get('email'),
        password: userdata.get('password')
    })
    )

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
    console.log('έχει id ο χρήστης;;', user)
    console.log('αν τον αναλύσω', JSON.stringify(user))

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))

            auth.user = user;

            localStorage.setItem('jwt', JSON.stringify(auth))
            next();
        }
    }
}