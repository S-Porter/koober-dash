import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import WowApp from './wowapp.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class KooberDashboard extends React.Component {
    render() {
        return (
            <div className="dashboardRoot">
                <div className="wowRoot">
                    <WowApp name="Dude" />
                </div>
            </div>
        );
    }
}

const KooberApp = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
            <AppBar title="Koober Dashboard" />
            <KooberDashboard />
        </div>
    </MuiThemeProvider>
);

ReactDOM.render(
    <KooberApp />,
    document.getElementById('app')
);