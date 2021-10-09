import React from 'react';
import { VALIDATOR_REQUIRE } from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import Input from '../../Components/FormElements/Input';
import { useForm } from '../../Components/hooks/form-hook';
import './AddProduct.css';
import {
	productFields,
	typeOptions,
	subTypeOptions,
	unitOptions,
} from './productFields';

const AddProduct = () => {
	const [formState, inputHandler, setFormData] = useForm(
		productFields.fields,
		productFields.isValid
	);
	return (
		<div className="addProduct-section">
			<p className="page-header">Add Product</p>
			<form className="addProduct-form">
				<div className="input-div">
					<Input
						element="input"
						type="text"
						id="name"
						label="Name"
						initialValue={formState.inputs.name.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide Product Name"
						onInput={inputHandler}
						class="addProduct-input"
					/>
					<Input
						element="select"
						type="text"
						id="type"
						label="Type"
						initialValue={formState.inputs.type.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please select a type"
						onInput={inputHandler}
						options={typeOptions}
						class="addProduct-input"
					/>

					<Input
						element="select"
						type="text"
						id="subType"
						label="Sub Type"
						initialValue={formState.inputs.subType.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please select a sub type"
						onInput={inputHandler}
						options={subTypeOptions}
						class="addProduct-input"
					/>
					<Input
						element="select"
						type="text"
						id="unit"
						label="Unit"
						initialValue={formState.inputs.unit.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please select a unit"
						onInput={inputHandler}
						options={unitOptions}
						class="addProduct-input"
					/>
				</div>
				<div className="button-div">
					<Button color="green" disabled={!formState.isValid}>
						Create Product
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
