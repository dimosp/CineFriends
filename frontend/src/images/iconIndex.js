import React from 'react';

export const likeIcon = () => {
    return(
        <svg
            width="1em" 
            height="1em" 
            viewBox="0 0 16 16" 
            classname="bi bi-heart-fill ml-1" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                fill-rule="evenodd" 
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
        </svg> 
    )
}

export const unlikeIcon = () => {
    return(
        <svg 
            width="1em" 
            height="1em" 
            viewBox="0 0 16 16" 
            class="bi bi-heart" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                fill-rule="evenodd"
                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
        </svg>
    )
}

export const commentIcon = () => {
    return(
        <svg 
            width="1em" 
            height="1em" 
            viewBox="0 0 16 16" 
            class="bi bi-chat-right-fill ml-1" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                fill-rule="evenodd" 
                d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
            />
        </svg>
    )
}

export const uncommentIcon = () => {
    return(
        <svg 
            width="1em" 
            height="1em" 
            viewBox="0 0 16 16" 
            class="bi bi-chat-right" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                fill-rule="evenodd" 
                d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
            />
        </svg>
    )
}

export const sharedIcon = () => {
    return(
        <svg 
            width="1em" 
            height="1em" 
            viewBox="0 0 16 16" 
            class="bi bi-share-fill ml-1" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                fill-rule="evenodd" 
                d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"
            />
        </svg>
    )
}

export const HomeIcon = () => {
    return(
        <svg 
            width="1.5em" 
            height="1.5em" 
            viewBox="0 0 16 16" 
            class="bi bi-house-fill" 
            fill="currentColor" 
            style={{color: 'white'}}
            xmlns="http://www.w3.org/2000/svg">
            <path 
                fill-rule="evenodd" 
                d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path 
                fill-rule="evenodd" 
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />   
        </svg>
    )
}