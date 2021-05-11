import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
