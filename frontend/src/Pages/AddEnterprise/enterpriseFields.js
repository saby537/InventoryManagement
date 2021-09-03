const typeOptions = ['Supplier', 'Contractor', 'Buyer'];
const enterpriseFields = {
	fields: {
		name: {
			value: '',
			isValid: false,
		},
		address: {
			value: '',
			isValid: false,
		},
		pan: {
			value: '',
			isValid: false,
		},
		gst: {
			value: '',
			isValid: false,
		},
		pincode: {
			value: '',
			isValid: false,
		},
		phone: {
			value: '',
			isValid: false,
		},
		email: {
			value: '',
			isValid: false,
		},
		type: {
			value: '',
			isValid: false,
		},
	},
	isValid: false,
};

export { enterpriseFields, typeOptions };
