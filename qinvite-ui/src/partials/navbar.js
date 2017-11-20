import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import LoginSignupForm from './login-signup-form';
import UserStore from '../stores/user-store';
import * as UserActions from '../actions/user-actions';

const Logged = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon color={"#fff"} /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      {/* <MenuItem primaryText="Refresh" /> */}
      <MenuItem primaryText="Sign out" onClick={props.handlelogout} />
    </IconMenu>
  );

const Login = (props) => {
    
    if(props.progress){
        return <CircularProgress style={{marginTop:9,paddingRight:3}} size={32} color={"#fff"}/>
    }
    
    return <FlatButton onClick={props.open} style={{color:"#fff",marginTop:"6px"}} {...props} label="Login"/>
};

export default class NavBar extends Component{

    constructor(props){
        super(props);


        const status = UserStore.getAuthStatus();
        this.state = {
            authenticated: status.authenticated,
            progress: status.progress,
            login: false,
            error: status.error
        };

        this.handleUserStoreChange = this.handleUserStoreChange.bind(this);
        this.handleLoginDialog = this.handleLoginDialog.bind(this);
    }

    handleLogout(){
        UserActions.signout();
    }

    handleLoginDialog(){
        this.setState({
            ...this.state,
            login: true
        });
    }


    componentWillMount(){
        UserStore.on("change",this.handleUserStoreChange);
    }

    componentWillUnmount(){
        UserStore.removeListener(this.handleUserStoreChange);
    }

    handleUserStoreChange(){
        const {authenticated,error,progress} = UserStore.getAuthStatus()
        this.setState({
            ...this.state,
            progress,
            authenticated,
            login: !authenticated,
            error
        });
    }
    render(){
        return(
            <div>
                <AppBar
                    title="Qinvte"
                    iconElementRight={this.state.authenticated ? <Logged handlelogout={this.handleLogout} /> : <Login open={this.handleLoginDialog} progress={this.state.progress}/>}
                />
                <LoginSignupForm open={this.state.login} error={this.state.error}/>
            </div>
        );
    }
}