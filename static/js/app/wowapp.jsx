import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

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
        const style = {
            height: 40,
            width: 220,
            margin: 15,
            display: 'inline-block',
            textAlign: 'center'
        }
        
        const char_lis = this.state.characters.map((character, i) => (
            <Paper key={i} zDepth={2} style={style}>{character.realm}: {character.name}</Paper>
        ));
        return (
            <div>
                {char_lis}
            </div>
        );
    }
}

export default WowApp;