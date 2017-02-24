import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import WowApp from './wowapp.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class KooberDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeApp: '1',
            apps: {
                '1': <WowApp />,
                '2': <Paper>music app</Paper>,
                '3': <Paper>food app</Paper>
            }
        };
    }

    handleChange(event, index, value){
        this.setState({activeApp: value})
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <DropDownMenu value={this.state.activeApp} onChange={this.handleChange.bind(this)}>
                        <MenuItem value={'1'} primaryText="WoW" />
                        <MenuItem value={'2'} primaryText="Music" />
                        <MenuItem value={'3'} primaryText="Food" />
                    </DropDownMenu>
                </div>
                <Paper className='appPane'>
                    {this.state.apps[this.state.activeApp]}
                </Paper>
            </div>
        );
    }
}

const KooberApp = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <KooberDashboard />
    </MuiThemeProvider>
);

ReactDOM.render(
    <KooberApp />,
    document.getElementById('app')
);