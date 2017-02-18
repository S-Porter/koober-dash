import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import WowApp from './wowapp.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class KooberDashboard extends React.Component {
    render() {
        return (
            <Tabs>
                <Tab label='WowApp'>
                    <WowApp name="Dude" />
                </Tab>
                <Tab label='FoodApp'>
                    <Paper style={{ height: 40, width: 220, margin: 15 }}>Food App</Paper>
                </Tab>
                <Tab label='NoteApp'>
                    <Paper style={{ height: 40, width: 220, margin: 15 }}>Notes App</Paper>
                </Tab>
            </Tabs>
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