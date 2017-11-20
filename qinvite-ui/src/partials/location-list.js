import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export default class LocationList extends Component{
    
    render(){
        const style = {
            height: 150,
            width: 150,
            margin: 20,
            textAlign: 'center',
            display: 'flex',
            position: "relative"
          };

        const imgStyle = {
            height: 110,
            width: 150
        };

        const headStyle = {
            position: "absolute",
            bottom: 2,
            left: 10
        };

        const checkStyle = {
            position: "absolute",
            right: 0,
            color: "#39b139"
        };

        if(document.body.clientWidth < 500){
            style.height = 70;
            style.width = 70;
            style.margin = 5;
            style.marginBottom = 30;
            imgStyle.height = 70;
            imgStyle.width = 70;
            // imgStyle.filter = "blur(2px)"
            headStyle.fontSize= "12px";
            headStyle.bottom = -28;
            headStyle.left = 2;
        }else{
            checkStyle.bottom = 0;
            checkStyle.right = 6;
        }

        return(
            <div className="d-flex flex-wrap justify-content-center p-2">
                {this.props.suggestions.map((e,i) => (
                    <Paper key={i} style={style} zDepth={2}>
                        {/* <div className="row">
                            <div className="col-sm-12">
                            </div>
                        </div> */}
                        <img style={imgStyle} src={e.image} />
                        <h6 style={headStyle}>{e.name}</h6>
                        {this.props.selected == i && <span style={checkStyle}>
                        <i className="material-icons">check_circle</i>
                        </span>}
                    </Paper>
                ))}
            </div>
        );
    }
}