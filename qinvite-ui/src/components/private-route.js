import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom';

import UserStore from '../stores/user-store';
import * as UserActions from '../actions/user-actions';


export default class PrivateRoute extends Component{
    
    constructor(props){
        super(props);

        const { authenticated } = UserStore.getAuthStatus();

        this.state = {
            authenticated
        };

        this.handleUserStoreChange = this.handleUserStoreChange.bind(this);
    }

    componentWillMount(){
        UserStore.on("change",this.handleUserStoreChange);
    }


    componentWillUnmout(){
        UserStore.removeListener(this.handleUserStoreChange);
    }

    handleUserStoreChange(){
        const { authenticated } = UserStore.getAuthStatus();
        this.setState({
            ...this.state,
            authenticated
        });
    }
    
    
    render(){
        const {component: Component ,...rest} = this.props;
        return (
            <Route {...rest} render={(props) => {
                
                if(!this.state.authenticated){
                    setTimeout(() => UserActions.showLoginDialog(),600);
                }
                
                return this.state.authenticated?
                <Component {...props} />
                : <Redirect to='/'/>
            }} />
        );
    }
}