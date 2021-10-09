const typeOptions = ['Type 1', 'Type 2', 'Type 3'];
const subTypeOptions = ['Sub Type 1', 'Sub Type 2', 'Sub Type 3'];
const unitOptions = ['Nos', 'Kg', 'Metre'];

const productFields = {
	fields: {
		name: {
			value: '',
			isValid: false,
		},
		type: {
			value: '',
			isValid: false,
		},
		subType: {
			value: '',
			isValid: false,
		},
		unit: {
			value: '',
			isValid: false,
		},
	},
	isValid: false,
};

export { productFields, typeOptions, subTypeOptions, unitOptions };
