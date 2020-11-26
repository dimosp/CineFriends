import React, { Component } from 'react';
import { list } from './apiUser';
import DefaultProfile from '../images/avatar.png';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list()
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data})
            }
        })
    }

    renderUsers = users => (
        <div className='row'>
            {users.map((user, i) => (
                <div className='col-lg-3 col-md-6'>
                <div className='card-column' key={i}>
                    <img 
                        style={{height: '150px', width: '150px'}} 
                        className='img-fluid img-thumbnail rounded-circle'
                        src={`${process.env.REACT_APP_API_URL}/users/photo/${user._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)} 
                        alt={user.name} 
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>{user.name}</h5>
                        <p className='card-text'>{user.email}</p>
                        <Link 
                            to={`/user/${user._id}`}
                            className='btn btn-raised btn-dark btn-sm'>
                            View Profile
                        </Link>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );

    render() {
        const {users} = this.state;
        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>Users</h2>
                {this.renderUsers(users)}
            </div>
        )
    }
}

export default Users;
