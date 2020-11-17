// {
//     "name": "Deadpooler",
//     "email": "deadpooler@gmail.com",
//     "password": "Deadpooler1"
//   }

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


// fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
// fetch(`${process.env.REACT_APP_API_URL}/posts`

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};
