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




// export const create = (userId, token, post) => {
//     return fetch(`${process.env.REACT_APP_API_URL}/posts/new/${userId}`, {
//         method: 'POST',
//         headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             body: post.get("body")
//         })
//     })
//         .then(response => {
//             return response;
//         })
//         .catch(err => console.log(err));
// };

// export const list = () => {
//     return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
//         method: 'GET'
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err))
// };
