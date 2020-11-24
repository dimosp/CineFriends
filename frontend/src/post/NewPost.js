import React, {Component} from 'react';
import {isAuthenticated} from '../auth';
import {create} from './apiPost';
import {Redirect} from 'react-router-dom';
import './Posts.css';        
    
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
            redirectToHome: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const {body, fileSize} = this.state;
        // if (fileSize>100000) {
        //     this.setState({
        //         error: 'File size should be less than 100kb',
        //         loading: false
        //     });
        //     return false;
        // }
        if (body.length === 0) {
            this.setState({error: 'Write something to post', loading: false});
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
                        redirectToHome: false
                    })};
            });
        }
    };

    newPostForm = (body) => (
        <form className="mx-auto my-auto post-size">
                
            {/* <div className='form-group'>
                <input
                    onChange= {this.handleChange('photo')}
                    type='file'
                    accept='image/*'
                    className='form-control'
                />
            </div> */}
            
            <div className='post-size form-group mx-auto col-lg-5'>
                <div class="text-center">
                    <textarea
                        style={{width: '90%', margin:'auto'}}
                        className="mx-auto"
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
                    className='btn btn-raised btn-dark'
                >
                    {/*my-create-post-button -->  btn btn-raised btn-dark */}
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
            redirectToHome
        } = this.state;

        if (redirectToHome) {
            // window.location.reload();
            
            return <Redirect to="/home" />;
        }      //////////    RELOAD  ??????????????

        return (
            <div className=''>
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
