/*
    Sections:
    Search/Char Overview
    Xmog wishlist
    Notes per character.
*/

import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

class WowApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/wow/getdatastore")
            .then((response) => {
                return response.json();
            }).then((json) => {
                this.setState({ characters: json.characters })
            });
    };

    render() {
        console.log(this.state)
        const char_style = {
            height: 40,
            width: 220,
            margin: 15,
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: '40px'
        }
        
        const char_lis = this.state.characters.map((character, i) => (
            <Paper key={i} zDepth={2} style={char_style}>{character.realm}: {character.name}</Paper>
        ));

        return (
            <div>
                <Tabs tabItemContainerStyle={{ background: '#212121', color: 'white' }} inkBarStyle={{ display: 'none' }}>
                    <Tab label='Characters'><Paper zDepth={2}>{char_lis}</Paper></Tab>
                    <Tab label='Character ToDo'><Paper zDepth={2} style={char_style}>todo placeholder</Paper></Tab>
                    <Tab label='XMOG Wishlist'><Paper zDepth={2} style={char_style}>wishlist placeholder</Paper></Tab>
                </Tabs>
            </div>
        );
    }
}

export default WowApp;