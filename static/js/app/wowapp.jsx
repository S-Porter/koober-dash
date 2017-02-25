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
        return (
            <div>
                <Tabs tabItemContainerStyle={{ background: '#212121', color: 'white' }} inkBarStyle={{ display: 'none' }}>
                    <Tab label='Characters'><CharOverviewPane chars={this.state.characters} /></Tab>
                    <Tab label='Characters TODO'><CharToDoPane chars={this.state.characters} /></Tab>
                    <Tab label='XMOG Wishlist'>
                        <Paper zDepth={2} style={{ minHeight: 200 }}>
                            <Paper zDepth={2}>wishlist placeholder</Paper>
                        </Paper>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

class CharToDoPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const char_style = {
            height: 40,
            margin: 15,
            display: 'block',
            textAlign: 'center',
            lineHeight: '40px'
        }
        const char_cards = this.props.chars.map((character, i) => (
            <Paper key={i} zDepth={2} style={char_style}>{character.name}</Paper>
        ));

        return (
            <Paper zDepth={2} style={{ minHeight: 200 }}>
                {char_cards}
            </Paper>
        );
    }
}

class CharOverviewPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const char_style = {
            height: 40,
            width: 220,
            margin: 15,
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: '40px'
        }
        const char_cards = this.props.chars.map((character, i) => (
            <Paper key={i} zDepth={2} style={char_style}>{character.name}</Paper>
        ));

        return (
            <Paper zDepth={2} style={{ minHeight: 200 }}>
                {char_cards}
            </Paper>
        );
    }
}

export default WowApp;