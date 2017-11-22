import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import ResponseList from '../components/response-list';

import EventStore from '../stores/event-store';
import UserStore from '../stores/user-store';
import *  as EventActions from '../actions/event-actions';


const EventCard = (props) => {

    return <Card>
        <CardHeader
        title={props.title}
        subtitle={props.date + " @ " + props.location}
        textStyle={{
            paddingRight:0
        }}
        actAsExpander={!props.showForm}
        showExpandableButton={!props.showForm}
        />
        {!props.showForm && <CardActions>
        <RaisedButton 
            label="Join Now"
            secondary={true}
            onClick={props.handleJoin} />
        </CardActions>}
        {props.showForm && <CardText>
                <TextField
                    hintText="your email address"
                    floatingLabelText="Email"
                    onChange={props.form.email}
                    /><br />
                <TextField
                    hintText="your full name"
                    floatingLabelText="Name"
                    onChange={props.form.name}
                    /><br />
                <RaisedButton 
                    label="Join"
                    secondary={true}
                    onClick={props.form.submit}
                    disabled={props.joined}
                        />
            </CardText>}
        {!props.showForm && <CardText expandable={true} >
            {props.eventDesc}
        </CardText>}
    </Card>
};

export default class JoinEventPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            formData:{},
            event: {},
            error:false,
            hash: props.match.params.id,
            loading: true,
            joined: false
        };


        this.form = {
            email: (e,n) => this.setState({
                ...this.state,
                formData:{
                    ...this.state.formData,
                    email: n
                }
            }),
            name: (e,n) => this.setState({
                ...this.state,
                formData:{
                    ...this.state.formData,
                    name: n
                }
            }),
            submit: this.handleJoinSubmit.bind(this)
        };

        console.log("hash",this.state.hash);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleEventStoreChange = this.handleEventStoreChange.bind(this);
    }

    handleJoinSubmit(){
        const event = EventStore.getCurrentEvent().id;
        console.log("event id",event);
        EventActions.joinEvent(event,this.state.formData.name,this.state.formData.email);
        this.setState({
            ...this.state,
            joined: true
        })
    }

    componentWillMount(){
        EventStore.on("change",this.handleEventStoreChange);
        if(this.state.hash){
            EventActions.fetchEvent(this.state.hash);
        }
    }

    renderResponses(){
        const auth = UserStore.getAuthStatus();
        console.log("auth",auth,"event",this.state.event);
        if(auth.authenticated && this.state.event.creator === parseInt(auth.user_id)){

            console.log("responses",this.state.event.responses,"auth",auth);
            
            return(
                <ResponseList 
                    responses={this.state.event.responses}
                />
            );
        }

        return(<div/>);
    }

    componentWillUnmount(){
        EventStore.removeListener(this.handleEventStoreChange);
    }

    handleEventStoreChange(){
        const {loading,error} = EventStore.getStatus();
        const event = EventStore.getCurrentEvent();
        if(event){
            event.date = event.date.slice(0,10);            
        }
        console.log("new event",event)
        this.setState({
            ...this.state,
            loading,
            error,
            event,
        });
    }


    handleJoin(){
        this.setState({
            ...this.state,
            showForm: true
        });
    }
    
    render(){

        const auth = UserStore.getAuthStatus();
        // const sameuser = this.state.event.creator === parseInt(auth.user_id);
        let responses = "";
        if(!this.state.error && this.state.event){
            responses = this.renderResponses();       
        }

        return (
            <div className="container-fluid">
                <br/>
                <div className="col-sm-12">
                    <h2>Join Event</h2>
                </div>
                <br/>
                <div className="col-sm-12">
                    {this.state.loading && !this.state.error && !this.state.event?
                        <CircularProgress/>:<EventCard
                        showForm={this.state.showForm}
                        title={this.state.event.title}
                        location={this.state.event.location}
                        date={this.state.event.date}
                        eventDesc={this.state.event.event_desc}
                        handleJoin={() => {this.handleJoin();console.log("join clicked")}}
                        form={this.form}
                        joined={this.state.joined}
                    />}

                    {this.state.error && <h2>Something went wrong!</h2>}
                    {responses}
                </div>

            </div>
        );
    }
}