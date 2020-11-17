import React, {Component} from 'react';
import {isAuthenticated} from '../auth';
import {create} from './apiPost';
import {Redirect} from 'react-router-dom';
// import DefaultProfile from '../images/avatar.jpg';
    
    
class NewPost extends Component {
    constructor() {
        super();
        this.state = { 
            body: '',
            photo: '',
            error: '',
            user: {}, 
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const {body, fileSize} = this.state;
        if (fileSize>100000) {
            this.setState({
                error: 'File size should be less than 100kb',
                loading: false
            });
            return false;
        }
        if (body.length === 0) {
            this.setState({error: 'All fields are required', loading: false});
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({error: ''});
        const value = 
            name === 'photo' ? 
            event.target.files[0] : 
            event.target.value;

        const fileSize = 
            name === 'photo' ? 
            event.target.files[0].size : 
            0;
            
        this.postData.set(name, value);

        console.log(this.postData.get("body"));

        this.setState({ [name]: value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData)
            .then(data => {
                console.log(data);
                if (data.error) this.setState({ error: data.error });
                else {
                    console.log('New Post: ', data);
                    this.setState({ 
                        loading: false,
                        body: '',
                        photo: '',
                        redirectToProfile: false
                    })};
            });
        }
    };

    newPostForm = (body) => (
        <form className="">
                
            {/* <div className='form-group'>
                <input
                    onChange= {this.handleChange('photo')}
                    type='file'
                    accept='image/*'
                    className='form-control'
                />
            </div> */}
            
            <div className='form-group mx-auto col-lg-5'>
                <div class="text-center">
                    <textarea
                        onChange={this.handleChange('body')}
                        type='text'
                        placeholder="What's on your mind?"
                        className='form-control'
                        value={body}
                    />
                </div>
            </div>
            
            <div className="text-center">
                <button
                    onClick={this.clickSubmit}
                    className='btn my-create-post-button'
                >
                    Create Post
                </button>
            </div>
        </form>
    );

    render() {
        const {
            body,
            photo,
            user, 
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to="/home" />;
        }

        return (
            <div className='container'>
                <div
                    className='alert alert-danger'
                    style={{display: error ? "" : "none"}}
                >
                    {error}
                </div>

                {loading ? (
                    <div className='jumpotron text-center'>
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ''
                )}

                {this.newPostForm(body)}
            </div>
        );
    };
};

export default NewPost;