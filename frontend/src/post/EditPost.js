import React, { Component } from 'react';
import { singlePost, update } from './apiPost';
import {isAuthenticated } from '../auth';
import {Redirect} from 'react-router-dom';

class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            body: '', 
            redirectToHome: false, 
            error: '', 
            fileSize: 0,
            loading: false
        }
    }

    init = (postrId) => {
        singlePost(postrId)
        .then(data => {
            if(data.error) {
                this.setState({redirectToHome: true});
            } else {
                this.setState({ 
                    id: data._id,
                    body: data.body, 
                    error: '', 
                });
            }
        })
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);     
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

        // const fileSize = 
        //     name === 'photo' ? 
        //     event.target.files[0].size : 
        //     0;
            
        this.postData.set(name, value);

        console.log(this.postData.get("body"));

        this.setState({ [name]: value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.state.id
            const token = isAuthenticated().token;

            update(postId, token, this.postData)
            .then(data => {
                console.log(data);
                if (data.error) this.setState({ error: data.error });
                else {
                    console.log('New Post: ', data);
                    this.setState({ 
                        loading: false,
                        body: '',
                        photo: '',
                        redirectToHome: true
                    })};
            });
        }
    };

    editPostForm = (body) => (
        <form className="bg-transparent">
                
            <div className='form-group'>
                <div class="text-center">
                    <textarea
                        style={{
                            border: '1px solid rgba(0,0,0,.3)'
                        }}
                        onChange={this.handleChange('body')}
                        type='text'
                        placeholder="Write something here..."
                        className='form-control'
                        value={body}
                    />
                </div>
            </div>
            
            <div className="text-center">
                <button
                    onClick={this.clickSubmit}
                    className='btn btn-raised btn-dark'
                    style={{
                        marginBottom: '500px'
                    }}
                >
                    Update
                </button>
            </div>
        </form>
    );

    render() {
        const { body, redirectToHome, error, loading } = this.state;

        if (redirectToHome) {
            return <Redirect to={'/home'} />;
        }

        return(
            <div className='container bg-transparent'>
                <h2 className='mt-5 mb-5 bg-transparent'>Edit Your Post</h2>  
                <div 
                    className="alert alert-danger bg-transparent"
                    style={{ 
                        display: error ? "" : "none",
                    }} 
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
                    {this.editPostForm(body)}
            </div>
        )
    }
}

export default EditPost;