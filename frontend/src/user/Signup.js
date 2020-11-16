import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { signup } from '../auth/index';


class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
            
    };
}

    handleChange = (name) => (event) => {
        this.setState({ error: ""});
        this.setState({ [name]: event.target.value });

    };

    clickSubmit = event => {
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,
            email,
            password,
        };

    signup(user).then(data => {
        if(data.error) this.setState({ error: data.error });
            else this.setState({
                error: "",
                name: "",
                email: "",
                password: "",
                open: true
            });
        });
    };
    
    signupForm = (name, email, password) => (
        <form>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Name</label>
                    <input onChange={this.handleChange("name")} 
                    type="text" className="form-control"
                    value={name}
                    />
                </div>
            </div>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Email</label>
                    <input onChange={this.handleChange("email")} 
                    type="email" className="form-control"
                    value={email}
                    />
                </div>
            </div>

            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange("password")} 
                    type="password" className="form-control"
                    value={password}/>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Your password must be 8-32 characters long and contain at least one number.
                    </small>
                </div>
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
                Sign Up
            </button>

    </form>
    )
    render() {
        const {name, email, password, error, open} = this.state;
        return (
            <div className='container'>
                <h2 className="mt-5 mb-5">Sign Up</h2>
                
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div 
                    className="alert alert-info" 
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created! Please {" "} <Link to="/signin">Sign In</Link>.
                    
                </div>
                     
                {this.signupForm(name, email, password)}
            
            </div>
        );
    };
};

export default Signup;