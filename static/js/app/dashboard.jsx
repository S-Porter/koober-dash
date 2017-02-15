import WowApp from './wowapp.jsx';

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

ReactDOM.render(
    <KooberDashboard />,
    document.getElementById('app')
);