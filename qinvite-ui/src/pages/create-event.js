import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import moment from 'moment';
import EventStore from '../stores/event-store';
import UserStore from '../stores/user-store';

import * as EventActions from '../actions/event-actions';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent
  } from 'material-ui/Stepper';

import LocationList from '../partials/location-list';

import './create-event.css';


export default class CreateEventPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            stepIndex: 0,
            finished: false,
            selected: 1,
            buttonLabel: "Next",
            linkValue:'',
            copied: false,
            eventName: null,
            eventDesc: null,
            eventLocation:null,
            eventDate: null,
        };
        this.dummyAsync = this.dummyAsync.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.formHandlers = {
            name: (e,n) => {
                this.setState({
                    ...this.state,
                    eventName: n
                });
            },
            location: (e,n) => {
                const {stepIndex,
                    eventDate,
                    eventDesc,
                    eventLocation,
                    eventName } = this.state;

                this.setState({
                    ...this.state,
                    eventLocation: n,
                    finished: !(eventDate && eventDesc && n && eventName) && stepIndex >= 1 
                });
            },
            desc: (e,n) => {
                this.setState({
                    ...this.state,
                    eventDesc: n
                });
            },
            date: (e,n) => {
                this.setState({
                    ...this.state,
                    eventDate: moment(n).format('YYYY-MM-DD HH:mm')
                });
            },
        }
    }


    componentWillMount(){
        EventStore.on("change",this.handleEventStoreChange);
    }

    componentWillUnmount(){
        EventStore.removeListener(this.handleEventStoreChange);
    }


    handleEventStoreChange(){
        this.setState({
            ...this.state,
            linkValue: 'http://localhost:8000/event/'+ EventStore.getNewHash()
        })
    }

    dummyAsync(cb){
        this.setState({...this.state,loading: true}, () => {
          this.asyncTimer = setTimeout(cb, 500);
        //   console.log("loading true");
        });
      };

    handleNext(){
        const {stepIndex,
                eventDate,
                eventDesc,
                eventLocation,
                eventName,
                finished } = this.state;

        if( !this.state.loading){
            console.log("handle next")
            this.dummyAsync(() => this.setState({
                ...this.state,
                loading: false,
                stepIndex: stepIndex+1,
                finished: !(eventDate && eventDesc && eventLocation && eventName) && stepIndex >= 1 ,
                buttonLabel: stepIndex == 1?"Confirm":"Next"
            }))
        }
    }


    handlePrev(){
        const {stepIndex} = this.state;
        if(!this.state.loading){
            this.setState({
                ...this.state,
                loading:false,
                stepIndex: stepIndex - 1,
                buttonLabel: stepIndex == 2?"Confirm":"Next"
            });
        }
    }


    getStepContent(index){

        switch(index){
            case 0: 
                return(
                    <div>
                        <TextField 
                        floatingLabelText="Event Title"
                        hintText="Awesome event"
                        defaultValue={this.state.eventName}
                        onChange={this.formHandlers.name} />
                        <br/>
                        
                    </div>
                );
            case 1: 
                return (
                    <div>
                        <DatePicker floatingLabelText="Event Date" hintText="Pick a date"
                        onChange={this.formHandlers.date}
                        /*defaultDate={this.state.eventDate|| Date.now()}*/ />
                        <br/>
                        <TextField 
                        hintText="Event Description"
                        multiLine={true}
                        rowsMax={4} 
                        onChange={this.formHandlers.desc}
                        defaultValue={this.state.eventDesc}/>
                        <br/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <TextField
                        hintText="Where.."
                        floatingLabelText="Location"
                        onChange={this.formHandlers.location}
                        defaultValue={this.state.eventLocation}
                        /> 
                    </div>
                );
            
            default:
                return (
                    <div className="link-container">
                        <CopyToClipboard text={this.state.linkValue}
                            onCopy={() => this.setState({...this.state,copied:true})}
                        >
                            <span className="link-spot">{this.state.linkValue}</span>
                            
                            
                            
                        </CopyToClipboard>
                        <span className="tooltip-link">{this.state.copied?"Copied":"Click to Copy"}</span>
                    </div>
                );
        }
    }



    renderHorizontal(finished){

        const contentStyle = {margin: '0 16px', overflow: 'hidden'};
        
        const { stepIndex } = this.state;
        
        return(
            <div>
                <Stepper activeStep={stepIndex} >
                    <Step>
                        <StepLabel>Name your Event</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Fill in Details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Location</StepLabel>
                    </Step>
                </Stepper>

                <ExpandTransition loading={this.state.loading} open={true}>
                    <div style={contentStyle}>
                        <div>{this.getStepContent(stepIndex)}</div> 
                    </div>
                </ExpandTransition>
                <RaisedButton
                primary={true}
                label="Back"
                disabled={stepIndex == 0}
                onClick={this.handlePrev}/>
                <RaisedButton
                    style={{
                        color:"#fff",
                        marginTop: "10px",
                        marginLeft:5
                    }}
                    disabled={finished}
                    secondary={true}
                    label={this.state.buttonLabel}
                    onClick={() => {if(!finished){this.handleNext()}this.handleConfirm()}}
                /> 
            </div>
        );
    }

    handleConfirm(){
        if(this.state.finished){
            EventActions.createEvent({
                title: this.state.eventName,
                date: this.state.eventDate,
                event_desc: this.state.eventDesc,
                location: this.state.eventLocation
            },UserStore.getToken());
        }

        console.log("handle confirm called")
    }

    renderVertical(finished){
        const { stepIndex } = this.state;

        return(
            <div>
                <Stepper activeStep={stepIndex} orientation="vertical">            
                    {["Name your Event","Fill in Details","Location"].map((el,e) => (
                        <Step key={e}>
                            <StepLabel>{el}</StepLabel>
                            <StepContent>
                                {this.getStepContent(e)}
                                <RaisedButton
                                    style={{
                                        color:"#fff",
                                        marginTop: "10px"
                                    }}
                                    disabled={finished}
                                    secondary={true}
                                    label={this.state.buttonLabel}
                                    onClick={() => {
                                        if(!finished){
                                            this.handleNext();console.log("handle")}; console.log("clicked")}}
                                /> 
                            </StepContent>
                        </Step>
                        ))}
                </Stepper>
            </div>
        );
    }

    render(){

        const { stepIndex,
                finished, } = this.state;
        // const f = !(finished && eventDate && eventDesc && eventLocation && eventName) && stepIndex == 2 ;
        // console.log(f);
        const content = document.body.clientWidth>500?this.renderHorizontal(finished):this.renderVertical(finished);
        return(
            <div className="container-fluid">
                <br/>
                <div className="col-sm-12">
                    <h2>New Event</h2>
                </div>
                <div className="col-sm-12">
                    
                    {content}
                              
                </div>
            </div>
        );
    }
}