import React from 'react';
import {List, ListItem} from 'material-ui/List';

class WowApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: []
        }
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
        const char_lis = this.state.characters.map((character, i) => (
            <ListItem key={i}>{character.realm}: {character.name}</ListItem>
        ));
        return (
            <List>
                {char_lis}
            </List>
        );
    }
}

export default WowApp;