import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	return (
		<h1>Hi there</h1>
		// <Router>
		// 	<Switch>
		// 		<Route path="/login" component={Login} />
		// 		<Route path="/register" component={Register} />
		// 	</Switch>
		// </Router>
	);
}

export default App;
