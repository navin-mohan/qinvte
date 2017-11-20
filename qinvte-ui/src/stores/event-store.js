import EventEmitter from 'events';

import Dispatcher from '../dispatcher';

class EventStore extends EventEmitter{
    constructor(){
        super();

        this.events = [];
        this.user_id = null;
        this.loading = false;
        this.error = false;
        this.new_event_hash = null;
    }

    getEvents(){
        return this.events;
    }

    getStatus(){
        return {
            user_id: this.user_id,
            loading: this.loading,
            error: this.error,
        };
    }

    getNewHash(){
        return this.new_event_hash;
    }


    handleActions(action){
        console.log("event store",action);

        switch(action.type){
            case 'CREATING_EVENT':{
                this.loading = true;
                this.error = false;
                this.emit("change");
                break;
            }

            case 'CREATED_EVENT':{
                this.loading = false;
                this.error = false;
                this.new_event_hash = action.payload.hash;
                this.emit("change");
                break;
            }

            case 'CREATE_EVENT_ERROR':{
                this.loading = false;
                this.error = true;
                this.new_event_hash = null;
                this.emit("change");
                break;
            }

            case 'FETCH_EVENTS':{
                this.loading = true;
                this.emit("change");
                break;
            }


            case 'FETCHED_EVENTS':{
                this.loading = false; 
                this.events = action.payload.data.events;
                this.error = false;
                this.user_id = action.payload.data.user;
                this.emit("change");
                break;
            }


            case 'FETCH_EVENTS_ERROR':{
                this.loading = false;
                this.error = true;
                this.events = [];
                this.emit("change");
                break;
            }
        }
    }
}

const store = new EventStore();

export default store;

Dispatcher.register(store.handleActions.bind(store));