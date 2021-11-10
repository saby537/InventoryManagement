import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
	const [defaultColor, setDefaultColor] = useState('#ccc');
	useEffect(() => {
		if (!props.disabled) {
			setDefaultColor('#ff0055');
		}
	}, []);
	if (props.href) {
		return (
			<a
				className={`button-custom button--${props.size || 'default'} ${
					props.inverse && 'button--inverse'
				} ${props.danger && 'button--danger'}`}
				href={props.href}
			>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link
				to={props.to}
				exact={props.exact}
				style={{
					backgroundColor: `${props.color ? props.color : '#ff0055'}`,
					borderColor: `${props.color ? props.color : '#ff0055'}`,
				}}
				className={`button-custom button--${props.size || 'default'} ${
					props.inverse && 'button--inverse'
				} ${props.danger && 'button--danger'}`}
			>
				{props.children}
			</Link>
		);
	}

	return (
		<button
			style={{
				backgroundColor: `${
					// props.color && !props.disabled ? props.color : defaultColor
					props.color ? props.color : defaultColor
				}`,
				borderColor: `${
					props.color && !props.disabled ? props.color : defaultColor
					// props.color ? props.color : defaultColor
				} !important`,
				borderRadius : "10px"
			}}
			className={`button-custom button--${props.size || 'default'} ${
				props.inverse && 'button--inverse'
			} ${props.danger && 'button--danger'} ${props.logOut && 'button-logout'} ${!props.disabled&& !props.customColor&& "active"}`}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
