const typeOptions = ['Type 1', 'Type 2', 'Type 3'];
const subTypeOptions = ['Sub Type 1', 'Sub Type 2', 'Sub Type 3'];
const unitOptions = ['Nos', 'Kg', 'Metre'];

const productFields = {
	fields: {
		Invoice: {
			value: '',
			isValid: false,
		},
		Warehouse: {
			value: '',
			isValid: false,
		},
		Supplier: {
			value: '',
			isValid: false,
		},
		User: {
			value: '',
			isValid: false
		}
	},
	isValid: false,
};

const productDetailsFields = {
	fields: {
		ProductName: {
			value: '',
			isValid: false,
		},
		Quantity: {
			value: '',
			isValid: false,
		},
		Units: {
			value: '',
			isValid: false,
		},
	},
	isValid: false,
};

export { productDetailsFields , productFields, typeOptions, subTypeOptions, unitOptions };
