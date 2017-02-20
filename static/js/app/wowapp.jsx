/*
    Sections:
    Search/Char Overview
    Xmog wishlist
    Notes per character.
*/

import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
        const style = {
            height: 40,
            width: 220,
            margin: 15,
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: '40px'
        }
        
        const char_lis = this.state.characters.map((character, i) => (
            <Paper key={i} zDepth={2} style={style}>{character.realm}: {character.name}</Paper>
        ));
        return (
            <div>
                <WowSearch />
                {char_lis}
            </div>
        );
    }
}

class WowSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div><TextField id='wowTextBox' style={{margin: 20}}></TextField><RaisedButton>Button</RaisedButton></div>
        );
    }
}

export default WowApp;