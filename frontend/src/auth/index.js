export const signup = 'Hello';

export const signin = 'Hello';

export const authenticate = 'Hello';

export const signout = next => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt');
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};