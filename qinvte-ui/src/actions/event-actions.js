import axios from 'axios';
import * as EndPoints from '../api-endpoints';
import Dispatcher from '../dispatcher';


export function createEvent(data,token){
    Dispatcher.dispatch({
        type: "CREATING_EVENT"
    })

    axios.post(EndPoints.createEvent,
            {...data,creator:1,hash_id:"1"}
        ,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ token
        }
    })
    .then(({data}) => {
        Dispatcher.dispatch({
            type: "CREATED_EVENT",
            payload: {
                hash: data.hash_id
            }
        })
    })
    .catch((error) => {
        Dispatcher.dispatch({
            type: "CREATE_EVENT_ERROR",
            payload:{
                error
            }
        })
    });
}


export function fetchEvents(user_id,token){
    Dispatcher.dispatch({
        type:"FETCH_EVENTS"
    });

    axios.get(EndPoints.createUser + user_id + '/',{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+token
        }
    })
    .then(({data}) => {
        Dispatcher.dispatch({
            type:"FETCHED_EVENTS",
            payload:{
                events: data.events,
                user: user_id
            }
        })
    })
    .catch((error) => {
        Dispatcher.dispatch({
            type: 'FETCH_EVENTS_ERROR',
            payload:{
                error
            }
        });
    });
}