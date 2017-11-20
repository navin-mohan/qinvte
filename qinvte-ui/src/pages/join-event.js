import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';


export default class JoinEventPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            eventTitle: "Thor Movie at Lulu Mall",
            eventDate: "12 Dec 2017",
            eventLoc: "LuLu Mall, Edapally",
            eventDesc:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. `
        };

        this.handleJoin = this.handleJoin.bind(this);
    }


    handleJoin(){
        this.setState({
            ...this.state,
            showForm: true
        });
    }
    
    render(){

        const chipStyle = {
            margin: 4
        };

        return (
            <div className="container-fluid">
                <br/>
                <div className="col-sm-12">
                    <h2>Join Event</h2>
                </div>
                <br/>
                <div className="col-sm-12">
                <Card>
                    <CardHeader
                    title={this.state.eventTitle}
                    subtitle={this.state.eventDate + " @ " + this.state.eventLoc}
                    textStyle={{
                        paddingRight:0
                    }}
                    actAsExpander={!this.state.showForm}
                    showExpandableButton={!this.state.showForm}
                    />
                    {!this.state.showForm && <CardActions>
                    <RaisedButton 
                        label="Join Now"
                        secondary={true}
                        onClick={this.handleJoin} />
                    </CardActions>}
                    {this.state.showForm && <CardText>
                            <TextField
                                hintText="your email address"
                                floatingLabelText="Email"
                                /><br />
                            <TextField
                                hintText="your full name"
                                floatingLabelText="Name"
                                /><br />
                            <RaisedButton 
                                label="Join"
                                secondary={true}
                                 />
                        </CardText>}
                    {!this.state.showForm && <CardText expandable={true} >
                        <div className="d-flex flex-row p-2 chips">
                            <div className="p-2">
                                <Chip
                                    style={chipStyle}
                                >
                                <Avatar icon={<FontIcon className="material-icons">location_on</FontIcon>} />
                                <a href="#">LuLu Mall, Edapally</a>
                                </Chip>
                            </div>
                            <div className="p-2">
                                <Chip
                                    style={chipStyle}
                                >
                                <Avatar size={24}>8.2</Avatar>
                                <a href="#">Thor: Ragnarok</a>
                                </Chip>
                            </div>
                        </div>
                        {this.state.eventDesc}
                    </CardText>}
                </Card>
                </div>

            </div>
        );
    }
}