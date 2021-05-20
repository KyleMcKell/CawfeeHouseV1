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

const Login = (props: Props) => {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (userId && password) {
				const body = { userId, password };
				const login = await axios.post('/user/login', body);
				setPassword('');
			}
		} catch (error) {}
	};

	return (
		<Grid>
			<Grid item>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<InputLabel htmlFor="userId">Username/Email</InputLabel>
						<Input id="userId" value={userId} onChange={handleUserIdChange} />
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
							Login
						</Button>
					</FormControl>
				</form>
			</Grid>
		</Grid>
	);
};

export default Login;
