import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";


class Signin extends Component {
    constructor() {
        super(); // super keyword (is a constructor) used to access and call functions on an object's parent
        this.state = { // this.state repsresents rendered values
            email: "",
            password: "",
            error: "",
            redirect: false,
            loading: false
        };
    }

    // handleChange function is used to set a new state for the input
    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value }); // Gives us access to the field value 
    };

    //authenticate function uses local storage of browser so that every time we need to authenticate the user we can get that user from the local storage
    authenticate (jwt, next) {
        if(typeof window !== "undefined") { // Check to see if the script is being run in a web-page inside a web-browser or not
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }

    clickSubmit = event => {
        event.preventDefault();  // When we click the button, the browser by default refreshes the page, we want to block that behaviour
        this.setState({loading: true}) // When button is clicked, a Loading message will appear until user is connected to database
        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        console.log(user);
        this.signin(user)
        .then(data => {
            if(data.error) {
                this.setState({error: data.error, loading: false})
            } else {
                //authenticate
                this.authenticate(data, () => {
                    this.setState({redirect: true})
                })
        
            }
        });


    };


    signin = (user) => {
        return fetch("http://localhost:8080/api/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
    }    


    signinForm = (email, password) => (
        <form>
            
            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Email</label>
                    <input
                        // Constantly checks to see if email field contains @ to verify that user gives us his email
                        onChange={this.handleChange("email")} //  onChange detects when the value of an input element changes
                        type="email"
                        className="form-control"
                        value={email}
                    />
                </div>
            </div>
        
            <div className="form-group">
                <div class="col-sm-3 my-1">
                    <label className="text-muted">Password</label>
                    <input
                        // Constantly checks to verify if user gives us password
                        onChange={this.handleChange("password")} 
                        type="password"
                        className="form-control"
                        value={password}
                    />
                </div>
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-dark"
            >
                Sign In
            </button>
            <br></br>
            Don't have an account? {" "} <Link to="/signup">Sign Up</Link>
        </form>
    );

    render() {
        const { email, password, error, redirect, loading } = this.state;

        if (redirect) {
            return <Redirect to="/home" /> // Redirects users to the Home page
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>


                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }} // Displays error message in case user gives wrong credentials
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                </div>
                 ) : (
                     ""
                 )}

                {this.signinForm(email, password)}
                
            </div>
        );
    }
}

export default Signin;