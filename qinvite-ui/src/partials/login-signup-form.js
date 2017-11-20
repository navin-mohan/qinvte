import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import * as UserActions from '../actions/user-actions';

export default class LoginSignupForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            open: props.open,
            login: true,
            loginValidity: true,
            signUpValidity: true
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.switchState = this.switchState.bind(this);
        this.loginDetails = {};
        this.signupDetails = {};
    }
    
    componentWillReceiveProps(nextProps){
        console.log("props",nextProps);
        this.setState({
            ...this.state,
            open: nextProps.open
        });
    }

    handleClose(){
        this.setState({
            ...this.state,
            open: false
        });
    }

    handleLogin(){
        const {password,username} = this.loginDetails;
        UserActions.authenicate(username,password);
        this.handleClose();
    }


    handleSignUp(){
        const { name,username,password,email } = this.signupDetails;
        const names = name.split(" ");
        UserActions.signUp(names[0],names[1],username,password,email);
        this.handleClose();
        
    }

    getLoginForm(){
        return (
            <div>
                <TextField
                    hintText="Your username"
                    floatingLabelText="Username"
                    onChange={(e,n) => {this.loginDetails.username = n; this.validate()}}
                    errorText={this.props.error && "Something went wrong"}
                />
                <br/>                
                <TextField
                    hintText="Your password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={(e,n) => {this.loginDetails.password = n; this.validate()}}
                    errorText={this.props.error && "Something went wrong"}
                    
                />
            </div>
        );
    }

    getSignupForm(){
        return(
            <div>
                <TextField
                    hintText="Your name"
                    floatingLabelText="Name"
                    onChange={(e,n) => {this.signupDetails.name = n; this.validate()}}
                    errorText={this.props.error && "Something went wrong"}
                />
                <br/>
                <TextField
                    hintText="Your username"
                    floatingLabelText="Username"
                    onChange={(e,n) => {this.signupDetails.username = n; this.validate()}}
                    errorText={this.props.error && "Something went wrong"}
                />
                <br/>
                <TextField
                    hintText="Your email"
                    floatingLabelText="Email"
                    type="email"
                    onChange={(e,n) => {this.signupDetails.email = n; this.validate()}}
                    errorText={this.props.error && "Something went wrong"}
                    
                />
                <br/>
                <TextField
                    hintText="Your password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={(e,n) => {this.signupDetails.password = n; this.validate()}}
                    errorText={this.props.error && "Something went wrong"}
                />
            </div>
        );
    }


    switchState(){
        this.setState({
            ...this.state,
            login: !this.state.login
        });
    }

    validate(){
        const loginValidity =  !(
            this.loginDetails.username && this.loginDetails.password
        );

        const signUpValidity =  !(
            this.signupDetails.username && this.signupDetails.name && this.signupDetails.password && this.signupDetails.email
        );
        
        this.setState({
            ...this.state,
            signUpValidity,
            loginValidity
        })
    }

    render(){

        const closeBtn = <FlatButton label="Close" onClick={this.handleClose}/>;
        const loginActions = [
            <RaisedButton label="Login" onClick={this.handleLogin} secondary={true} disabled={this.state.loginValidity}/>,
            <FlatButton label="Sign Up" onClick={this.switchState}  />,
            closeBtn
        ];

        const signupActions = [
            <RaisedButton label="Sign Up" onClick={this.handleSignUp} secondary={true} disabled={this.state.signUpValidity} />,
            <FlatButton label="Login" onClick={this.switchState} />,            
            closeBtn            
        ];

        const content = this.state.login?this.getLoginForm():this.getSignupForm();

        return(
            <Dialog
                title={this.state.login?"Login":"Create an Account"}
                actions={this.state.login?loginActions:signupActions}
                modal={true}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={{
                    textAlign:"center",
                    width:"30%",
                    minWidth: "200px"
                }}

                actionsContainerStyle={{
                    marginTop:"10px",
                    marginBottom: "10px",
                    textAlign:"center"
                }}
            >
                {content}    
            </Dialog>
        );
    }
}