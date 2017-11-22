import EventEmitter from 'events';

import Dispatcher from '../dispatcher';


class UserStore extends EventEmitter{
    constructor(){
        super();

        this.authenticated = false;
        this.token = null;
        this.error = false;
        this.progress = false;
        this.user_id = null;
        this.checkLocalStorage();
    }



    getToken(){
        return this.token;
    }
    checkLocalStorage(){
        const token = localStorage.getItem('auth-token');
        const user_id = localStorage.getItem('user-id');
        if(token && user_id){
            this.authenticated = true;
            this.token = token;
            this.user_id = user_id;
            this.emit("change");
        }
    }

    setLocalStorage(){
        localStorage.setItem("auth-token",this.token);
        localStorage.setItem("user-id",this.user_id);        
    }

    clearLocalStorage(){
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-id");
    }

    getAuthStatus(){
        return {
            authenticated: this.authenticated,
            token: this.token,
            error: this.error,
            progress: this.progress,
            user_id: this.user_id
        };
    }

    handleActions(action){
        switch(action.type){
            case 'AUTH_SUCCESS':{
                this.error = false;
                this.authenticated = true;
                this.token = action.payload.token;
                this.progress = false;
                this.user_id = action.payload.id;
                this.setLocalStorage();
                this.emit('change');
                break;
            }

            case 'AUTH_ERROR':{
                this.error = true;
                this.authenticated = false;
                this.token = null;
                this.progress = false;      
                this.user_id = null;          
                this.clearLocalStorage();
                console.log("Error:",action.payload.err);
                this.emit('change');                
                break;
            }

            case 'AUTH_PROGRESS':{
                this.error = false;
                this.authenticated = false;
                this.token = null;
                this.progress = true;     
                this.user_id = null;           
                this.emit('change');                
                break;
            }

            case 'AUTH_LOGOUT':{
                this.error = false;
                this.authenticated = false;
                this.token = '';
                this.progress = false;
                this.user_id = null;    
                this.clearLocalStorage();            
                this.emit("change");
                break;
            }

            case 'SHOW_LOGIN_DIALOG':{
                this.error = false;
                this.authenticated = false;
                this.token = '';
                this.progress = false; 
                this.emit("change");
                break;
            }

            case 'SIGN_UP_SUCCESS':{
                this.error = false;
                this.authenticated = true;
                this.user_id = action.payload.data.id;
                this.progress = false;
                this.emit("change");
                break;
            }
        }
    }

}


const store = new UserStore();

export default store;

Dispatcher.register(store.handleActions.bind(store));
