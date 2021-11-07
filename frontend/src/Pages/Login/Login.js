import React, { useState, useEffect } from 'react';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import ErrorModal from '../../Components/UIElements/ErrorModal';
import Input from '../../Components/FormElements/Input';
import LoadingSpinner from '../../Components/UIElements/LoadingSpinner';
import { useForm } from '../../Components/hooks/form-hook';
import { connect } from 'react-redux';
import {
	signUpStart,
	logInStart,
	emptyError,
} from '../../redux/user/user.actions';
// import { hideBackArrow } from '../../redux/user/user.actions';
import './Login.css';
import { createStructuredSelector } from 'reselect';
import {
	selectError,
	selectLoading,
	selectUserId,
} from '../../redux/user/user.selector';

const Login = ({
	startSignUp,
	startLogIn,
	isLoading,
	error,
	clearError,
	userId,
}) => {
	

	const [isLoginMode, setIsLoginMode] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(
		{
			mobile: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);
	const authSubmitHandler = async (event) => {
		event.preventDefault();
		if (isLoginMode) {
			await startLogIn({
				mobile: formState.inputs.mobile.value,
				password: formState.inputs.password.value,
			});
		} else {
			await startSignUp({
				name: formState.inputs.name.value,
				mobile: formState.inputs.mobile.value,
				password: formState.inputs.password.value,
			});
		}
	};
	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					address: undefined,
				},
				formState.inputs.mobile.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	console.log(formState);
	return (
		<React.Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element="input"
							type="text"
							id="name"
							label="Name"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a name!"
							onInput={inputHandler}
						/>
					)}
					<Input
						element="input"
						type="text"
						id="mobile"
						label="Mobile Number"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid Mobile Number!!"
						onInput={inputHandler}
					/>
					<Input
						element="input"
						type="password"
						id="password"
						label="Password"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a password with minimum 6 characters!!"
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? 'LOGIN' : 'SIGN UP'}
					</Button>
				</form>
				<Button type="submit" onClick={switchModeHandler} inverse>
					Switch to {!isLoginMode ? 'LOGIN' : 'SIGN UP'}
				</Button>
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startSignUp: (user) => dispatch(signUpStart(user)),
	startLogIn: (user) => dispatch(logInStart(user)),
	clearError: () => dispatch(emptyError())
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	error: selectError,
	userId: selectUserId,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
