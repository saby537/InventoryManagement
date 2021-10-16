import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validator';
import './Input.css';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
				isTouched: false,
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const [InputState, dispatch] = useReducer(inputReducer, {
		value:
			props.initialValue === undefined || props.initialValue === null
				? ''
				: props.initialValue,
		isTouched: false,
		isValid: props.initialValid === undefined ? false : props.initialValid,
	});
	const { id, onInput } = props;
	const { isValid, value } = InputState;
	const changeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			validators: props.validators,
		});
	};
	const touchHandler = () => {
		dispatch({ type: 'TOUCH' });
	};

	useEffect(() => {
		if (props.finalValue) {
			dispatch({
				type: 'CHANGE',
				val: `${props.finalValue}`,
				validators: props.validators,
			});
		}
	}, [props.finalValue, props.validators]);

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);
	const element =
		props.element === 'input' ? (
			// <input
			// 	style={{ textAlign: 'center' }}
			// 	type={props.type}
			// 	id={props.id}
			// 	placeholder={props.placeholder}
			// 	onChange={changeHandler}
			// 	onBlur={touchHandler}
			// 	value={InputState.value}
			// />
			<div className="form-floating">
				<input    
				type={props.type} className="form-control" id={props.id} placeholder={props.placeholder} onChange={changeHandler} value={InputState.value} onBlur={touchHandler} style={{margin:"0px"}}></input>
				<label htmlFor="txtNome">{props.label}</label>
        	</div>
		) : (
			// <select
			// 	style={{
			// 		textIndent: `${
			// 			InputState.value === '' || InputState.value === '0'
			// 				? 50 - 1.2 * 12
			// 				: 50 - 1.2 * InputState.value.length
			// 		}%`,
			// 	}}
			// 	value={InputState.value === '0' ? '' : InputState.value}
			// 	className="input-dropDown"
			// 	onChange={changeHandler}
			// >
			// 	<option value="" defaultValue disabled hidden>
			// 		Select an Option
			// 	</option>
			// 	{props.options.map((opt, ind) => (
			// 		<option key={`${opt}-${ind}`} value={opt}>
			// 			{opt}
			// 		</option>
			// 	))}
			// </select>
			<div className="form-floating">
				<select className="form-select" onChange={changeHandler} value={InputState.value === '0' ? '' : InputState.value} onBlur={touchHandler} id = {props.id}>
					<option value="" defaultValue disabled hidden>
						Select an Option
					</option>
					{props.options.map((opt, ind) => (
						<option key={`${opt}-${ind}`} value={opt}>
							{opt}
						</option>
					))}
		  	</select>
		  <label htmlFor="floatingSelect">{props.label}</label>
		  </div>
		);
	return (
		<div
			style={{marginBottom: "50px", border : "none"}}
			className={`form-control ${
				!InputState.isValid && InputState.isTouched && 'form-control--invalid'
			} ${props.class}`}
		>
			{/* {props.label !== '' && !props.addButton && (
				// <label htmlFor={props.id}>{props.label}</label>
			)} */}
			{element}
			{!InputState.isValid && InputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};

export default Input;
