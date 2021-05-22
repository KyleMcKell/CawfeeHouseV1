import {
	Button,
	FormControl,
	Grid,
	Input,
	InputLabel,
} from '@material-ui/core';
import axios from '../axios';
import React, { FormEvent, useState, ChangeEvent } from 'react';

interface Props {}

const Register = (props: Props) => {
	const [username, setUserId] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (username && password) {
				const body = { username, email, password };
				const register = await axios.post('/user/register', body);
				setPassword('');
			}
		} catch (error) {}
	};

	return (
		<Grid>
			<Grid item>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input
							id="username"
							value={username}
							onChange={handleUsernameChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input id="email" value={email} onChange={handleEmailChange} />
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							value={password}
							onChange={handlePasswordChange}
							type="password"
						/>
					</FormControl>
					<FormControl>
						<Button variant="contained" color="primary" type="submit">
							Register
						</Button>
					</FormControl>
				</form>
			</Grid>
		</Grid>
	);
};

export default Register;
