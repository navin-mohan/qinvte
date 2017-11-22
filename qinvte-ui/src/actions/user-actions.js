import axios from 'axios';

import Dispatcher from '../dispatcher';

import * as Endpoints from '../api-endpoints';


export function signUp(firstname,lastname,username,password,email){
    Dispatcher.dispatch({
        type: 'AUTH_PROGRESS'
    })
    axios.post(Endpoints.createUser,{
        username,
        password,
        email,
        "first_name":firstname,
        "last_name":lastname
    },{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(({data}) => {
        Dispatcher.dispatch({
            type: 'SIGNUP_SUCCESS',
            payload:data
        })

        authenicate(username,password);
    })
    .catch( err => Dispatcher.dispatch({
        type: 'AUTH_ERROR',
        payload: {
            err
        }
    }));
}



export function showLoginDialog(){
    Dispatcher.dispatch({
        type: 'SHOW_LOGIN_DIALOG'
    });
}


export function signout(){
    Dispatcher.dispatch({
        type: 'AUTH_PROGRESS'
    })
    setTimeout(()=>{
        Dispatcher.dispatch({
            type: 'AUTH_LOGOUT'
        })
    },1000)
}


export function authenicate(username,password){
    Dispatcher.dispatch({
        type: 'AUTH_PROGRESS'
    });
    axios.post(Endpoints.Auth,{
        username,
        password
    },{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then( ({data}) => {
        Dispatcher.dispatch({
            type: 'AUTH_SUCCESS',
            payload: data
        })
    })
    .catch( err => Dispatcher.dispatch({
        type: 'AUTH_ERROR',
        payload: {
            err
        }
    }));
}