import React from 'react';
import Button from '../FormElements/Button';
import './TableRow.css';

const TableRow = ({ values, id }) => {
	return (
		<div className="row-container">
			<label
				key={`row-id-${id}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				{id}
			</label>
			<label
				key={`row-id-${id}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				{values.name}
			</label>
			<label
				key={`row-id-${id}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				{values.location}
			</label>
			<label
				key={`row-id-${id}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				<Button color="red" size="small">
					Edit
				</Button>
			</label>
			<label
				key={`row-id-${id}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				<Button color="green" size="small">
					Details
				</Button>
			</label>
		</div>
	);
};

export default TableRow;
