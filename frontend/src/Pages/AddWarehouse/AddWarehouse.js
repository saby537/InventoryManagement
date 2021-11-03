import React from 'react';
import { VALIDATOR_REQUIRE } from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import Input from '../../Components/FormElements/Input';
import { useForm } from '../../Components/hooks/form-hook';
import { warehouseFields } from './warehouseFields';
import './AddWarehouse.css';


import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectError, selectShopLoading } from '../../redux/Shop/shop.selector';
import { addWarehouseStart, emptyError } from '../../redux/Shop/shop.actions.js';

const AddWarehouse = ({addWarehouse,clearError,isLoading,error}) => {
	const [formState, inputHandler, setFormData] = useForm(
		warehouseFields.fields,
		warehouseFields.isValid
	);

	const submitHandler = async (event) => {
		event.preventDefault();
		const payload = {
			Name : formState.inputs.name.value,
			Address : formState.inputs.address.value,
			City : formState.inputs.city.value,
		}
		await addWarehouse(payload);
	}
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
					<Button color="blue" disabled={!formState.isValid} onClick={submitHandler}>
						Create Warehouse
					</Button>
				</div>
			</form>
		</div>
	);
};

// export default AddWarehouse;

const mapDispatchToProps = (dispatch) => ({
	addWarehouse: (warehouse) => dispatch(addWarehouseStart(warehouse)),
	clearError: () => dispatch(emptyError()),
	
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectShopLoading,
	error: selectError,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddWarehouse);
