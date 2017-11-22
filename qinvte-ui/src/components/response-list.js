import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const ResponseList = (props) => ( 

            <div className="container">
                <br/>
                <br/>
                <br/>
                <h3 className="text-center" style={{
                    marginLeft:10
                }}>Responses</h3>
                <List>
                    {props.responses.map((e) => (
                        <ListItem primaryText={e.first_name + " " + e.last_name} 
                                secondaryText={e.email}
                                id={e.id}
                                 />

                    ))}
                </List>
            </div>
);

export default ResponseList;