import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default class HomePage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 text-center banner">
                        <h2>Invitation Made Simple</h2>
                        <p>Create and Share your event easily in a minute.</p>
                        <Link to="create-event"><button className="btn btn-success try-btn">Try Now!</button></Link>
                    </div>
                    <div className="col-sm-12 text-center details">
                        <h2>What is Qinvte?</h2>
                        <p>The project ‘Qinvte’ aims to implement the simplest event planning app where anyone can create and share their event easily in a couple or more steps. The user would be able to consider the  count of the number of people attending the event while planning it. App features like guessing the details of the event based on the name of the event through NLP processing add to the better user experience. The core goal of the app is the preserve its simplicity by letting the user create a complete event plan in less than 5 mins. </p>
                    </div>
                </div>
            </div>
        );
    }
}