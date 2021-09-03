import React from 'react';
import { VALIDATOR_REQUIRE } from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import Input from '../../Components/FormElements/Input';
import { useForm } from '../../Components/hooks/form-hook';
import { warehouseFields } from './warehouseFields';
import './AddWarehouse.css';

const AddWarehouse = () => {
	const [formState, inputHandler, setFormData] = useForm(
		warehouseFields.fields,
		warehouseFields.isValid
	);
	return (
		<div className="addWarehouse-section">
			<p className="page-header">Add Warehouse</p>
			<form className="addWarehouse-form">
				<div className="input-div">
					<Input
						element="input"
						type="text"
						id="name"
						label="Name"
						initialValue={formState.inputs.name.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide Warehouse Name"
						onInput={inputHandler}
						class="addWarehouse-input"
					/>
					<Input
						element="input"
						type="text"
						id="city"
						label="City"
						initialValue={formState.inputs.city.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide City name"
						onInput={inputHandler}
						class="addWarehouse-input"
					/>
					<Input
						element="input"
						type="text"
						id="address"
						label="Address"
						initialValue={formState.inputs.address.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide Address name"
						onInput={inputHandler}
						class="addWarehouse-input"
					/>
				</div>
				<div className="button-div">
					<Button color="blue" disabled={!formState.isValid}>
						Create Warehouse
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddWarehouse;
