import React from 'react';

class WowApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rep: {data: []}
        }
    }

    componentDidMount() {
        const self = this;
        fetch("http://localhost:8080/api/wow/getrep/proudmoore/glaaki")
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                self.setState({ rep: json })
            });
    };

    render() {
        return (
            <ul>
                {this.state.rep.data.map(function (rep) {
                    return <li>{rep.Name}: {rep.Value}</li>
                })}
            </ul>
        );
    }
}

export default WowApp;