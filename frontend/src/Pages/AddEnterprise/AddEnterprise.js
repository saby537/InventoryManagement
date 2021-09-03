import React from 'react';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_NUMBER,
	VALIDATOR_REQUIRE,
} from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import Input from '../../Components/FormElements/Input';
import { useForm } from '../../Components/hooks/form-hook';
import './AddEnterprise.css';
import { enterpriseFields, typeOptions } from './enterpriseFields';

const AddEnterprise = () => {
	const [formState, inputHandler, setFormData] = useForm(
		enterpriseFields.fields,
		enterpriseFields.isValid
	);
	return (
		<div className="addEnterprise-section">
			<p className="page-header">Add Enterprise</p>
			<form className="addEnterprise-form">
				<div className="input-div">
					<Input
						element="input"
						type="text"
						id="name"
						label="Name"
						initialValue={formState.inputs.name.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide Enterprise Name"
						onInput={inputHandler}
						class="addEnterprise-input"
					/>
					<Input
						element="input"
						type="text"
						id="address"
						label="Address"
						initialValue={formState.inputs.address.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide address"
						onInput={inputHandler}
						class="addEnterprise-input"
					/>
					<Input
						element="input"
						type="text"
						id="pan"
						label="PAN Number"
						initialValue={formState.inputs.pan.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide PAN Number"
						onInput={inputHandler}
						class="addEnterprise-input"
					/>
					<Input
						element="input"
						type="text"
						id="gst"
						label="GST Number"
						initialValue={formState.inputs.gst.value}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please provide GST number"
						onInput={inputHandler}
						class="addEnterprise-input"
					/>
					<Input
						element="input"
						type="text"
						id="pincode"
						label="Pincode"
						initialValue={formState.inputs.pincode.value}
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER]}
						errorText="Please provide Pincode"
						onInput={inputHandler}
						class="addEnterprise-input"
					/>
					<Input
						element="input"
						type="text"
						id="phone"
						label="Phone Number"
						initialValue={formState.inputs.phone.value}
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER]}
						errorText="Please provide Phone Number"
						onInput={inputHandler}
						class="addEnterprise-input"
					/>
					<Input
						element="input"
						type="text"
						id="email"
						label="Email Id"
						initialValue={formState.inputs.email.value}
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
						errorText="Please provide Email ID"
						onInput={inputHandler}
						class="addEnterprise-input"
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
						class="addEnterprise-input"
					/>
				</div>
				<div className="button-div">
					<Button color="#cf0003" disabled={!formState.isValid}>
						Create Enterprise
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddEnterprise;
