export const create = (userId, token, postData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/new/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: postData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};

export const singlePost = (posterId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/${posterId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};

export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))
}

export const update = (postId, token, postdata) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },       
        body: postdata
    })
        .then(response => {
            console.log("response", response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/like`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },       
        body: JSON.stringify({userId, postId})
    })
        .then(response => {
            console.log("response", response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/unlike`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },       
        body: JSON.stringify({userId, postId})
    })
        .then(response => {
            console.log("response", response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const fetchFollowerPosts = (token, id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${id}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
};

export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};