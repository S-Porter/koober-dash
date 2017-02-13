class KooberDashboard extends React.Component {
    render() {
        return (
            <div className="dashboardRoot">
                <div className="wowRoot">
                    <WowApp name="Sean" />
                </div>
            </div>
        );
    }
}

class WowApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HelloWorld name={this.props.name} />
        );
    }
}

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "grey"
        }
    }

    toggleColor() {
        if (this.state.color === "grey") {
            this.setState({color: "black"})
        } else {
            this.setState({color: "grey"})
        }
    }

    changeColor(event) {
        this.setState({
            color: event.target.value
        });
    }

    render() {
        const styleObj = {color: this.state.color}
        return (
            <div style={styleObj}>
                <h2 onClick={this.toggleColor.bind(this)}>Hello, {this.props.name}.</h2>
                <p>welcome to your dashboard</p>
                <input value={this.state.color} onChange={this.changeColor.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <KooberDashboard />,
    document.getElementById('app')
);