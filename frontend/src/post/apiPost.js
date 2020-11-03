// {
//     "name": "Deadpooler",
//     "email": "deadpooler@gmail.com",
//     "password": "Deadpooler1"
//   }

export const create = (userId, token, post) => {
    return fetch(`http://localhost:8080/api/post/new/${userId}`, {
        method: 'POST',
        headers: {
            // Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

// fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
// fetch(`${process.env.REACT_APP_API_URL}/posts`

export const list = () => {
    return fetch(`http://localhost:8080/api/posts`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};
