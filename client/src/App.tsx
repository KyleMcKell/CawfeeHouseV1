import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './utils/User';

function App() {
	const [user, setUser] = useState<User>();

	return (
		<>
			<h1>Hi there</h1>
			<Router>
				<Switch>
					<Route path="/login">
						<Login setUser={setUser} />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
