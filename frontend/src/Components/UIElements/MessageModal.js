import React from 'react';
import Modal from './Modal';
import Button from '../FormElements/Button';

const MessageModal = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			show={!!props.show}
			header={props.header}
			footer={<Button onClick={props.onClear}>Okay</Button>}
		>
			<p>{props.message}</p>
		</Modal>
	);
};

export default MessageModal;
