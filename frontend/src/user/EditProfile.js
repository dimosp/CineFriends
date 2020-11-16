import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';
import DefaultProfile from '../images/avatar.png';
// import DeleteUser from './DeleteUser';

class EditProfile extends Component {

    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            redirectToProfile: false, 
            error: '', 
            fileSize: 0,
            loading: false,
            about: ''
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({redirectToProfile: true});
            } else {
                this.setState({ 
                    id: data._id, 
                    name: data.name, 
                    email: data.email,
                    error: '', 
                    about: data.about
                });
            }
        })
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);     
    }

    isValid = () => {
        const {name, email, password, fileSize} = this.state;
        if (fileSize > 100000) {
            this.setState({ error: 'File size should be less 1mb'})
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: 'Name is required', loading: false })
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: 'A valid email is required', loading: false })
            return false;
        }
        if (password.length >= 1 && password.length <=7 ) {
            this.setState({ error: 'Password must be 8-32 characters long', loading: false })
            return false;
        }
        if (password.length > 7 && !/\d/.test(password)) {
            this.setState({ error: 'Password should contain at least one number', loading: false })
            return false;
        }
        return true;
    }

    handleChange = (name) => (event) => {
        this.setState({ error: '' })
        const value = name === 'photo' 
            ? event.target.files[0]
            : event.target.value;
        const fileSize = name === 'photo' 
            ? event.target.files[0].size
            : 0;

        console.log(event.target.value);
        console.log({ [name]: event.target.value });
        console.log({ [name]: value });

        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            console.log('PROFILLED:', this.state.name, this.state.email, this.state.password)
            console.log('USERDATA', this.userData)

            update(userId, token, this.userData)
            .then(data => {
                if (data.error) this.setState({ error: data.error });
                else 
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        })
                    });
            });
        };
    };

    editProfileForm = (name, email, password, about) => (
        
        <form>
            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Profile Photo</label>
                    <input 
                        onChange={this.handleChange("photo")} 
                        type="file"
                        accept='image/*'
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Name</label>
                    <input 
                        onChange={this.handleChange("name")} 
                        type="text" 
                        className="form-control"
                        value={name}
                    />
                </div>
            </div>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Email</label>
                    <input 
                        onChange={this.handleChange("email")} 
                        type="email" 
                        className="form-control"
                        value={email}
                    />
                </div>
            </div>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">About</label>
                    <textarea 
                        onChange={this.handleChange("about")} 
                        type="text" 
                        className="form-control"
                        value={about}
                    />
                </div>
            </div>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Password</label>
                    <input 
                        onChange={this.handleChange("password")} 
                        type="password" 
                        className="form-control"
                        value={password}
                    />
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Your password must be 8-32 characters long and contain at least one number.
                    </small>
                </div>
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
                Update
            </button>
        </form>
    )

    render() {
        const { 
            id, 
            name, 
            email, 
            password, 
            redirectToProfile, 
            error, 
            loading, 
            about
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id 
        ? `${process.env.REACT_APP_API_URL}/users/photo/${id}?${new Date().getTime()}` 
        : DefaultProfile;

        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>Edit Profile</h2>
                <div 
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }} 
                >
                    {error}
                </div>

                { loading && error==='none' ? (
                    <div className='jumpotron text-center'>
                        <h2> Loading... </h2>
                    </div>
                ) : (
                    ''
                )}

                <img 
                    style={{height: '200px', width: 'auto'}} 
                    className='img-thumbnail'
                    src={photoUrl}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={name} 
                />

                {this.editProfileForm(name, email, password, about)}
            </div>
        )
    }
}

export default EditProfile;