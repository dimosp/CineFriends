import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

function SinglePost(props) {
    return(
        <div class="card gedf-card border-secondary m-5 ">
            <div class="card-header ">
                <div class="d-flex justify-content-between align-items-center ">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mr-2">
                        <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                    </div>
                    <div class="ml-2">
                            <div class="h5 m-0 text-left"><Link to={`${props.posterId}`}>{props.posterName}</Link></div>
                            <div class="text-muted h7 mb-2 font-weight-normal"> <i class="fa fa-clock-o"></i> {new Date(props.created).toDateString()} </div>
                    </div>
                </div>
                <div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                            <div class="h6 dropdown-header">Configuration</div>
                            <a class="dropdown-item" href="#">Save</a>
                            <a class="dropdown-item" href="#">Hide</a>
                            <a class="dropdown-item" href="#">Report</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">


            <p class="card-text text-left">
                {props.body.substring(0, 100)}
            </p>
        </div>
        <div class="card-footer">
            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
            <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
            <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
        </div>
    </div>
                )

}

export default SinglePost;