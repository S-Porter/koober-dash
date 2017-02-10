
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
    <HelloWorld name="Sean"/>,
    document.getElementById('app')
);