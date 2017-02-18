import React from 'react';
import {List, ListItem} from 'material-ui/List';

class WowApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rep: {data: []}
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/wow/getrep/proudmoore/glaaki")
            .then((response) => {
                return response.json();
            }).then((json) => {
                this.setState({ rep: json })
            });
    };

    render() {
        const rep_lis = this.state.rep.data.map((rep, i) =>
            <ListItem key={i}>{rep.Name}: {rep.Value}</ListItem>
        );
        return (
            <List>
                {rep_lis}
            </List>
        );
    }
}

export default WowApp;