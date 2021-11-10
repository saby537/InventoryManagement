import React from 'react';
import Button from '../FormElements/Button';
import './TableRow.css';

const TableRow = ({ values, id }) => {
	return (
		<div className="row-container">
			<label
				key={`row-id-${id}_${id}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				{id}
			</label>
			<label
				key={`row-id-${id}_${id+1}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				{values.name}
			</label>
			<label
				key={`row-id-${id}_${id+2}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				{values.location}
			</label>
			<label
				key={`row-id-${id}_${id+3}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				<Button color="red" size="small" customColor>
					Edit
				</Button>
			</label>
			<label
				key={`row-id-${id}_${id+4}`}
				className={`row-label ${id % 2 === 1 && 'odd'}`}
			>
				<Button color="green" size="small" customColor>
					Details
				</Button>
			</label>
		</div>
	);
};

export default TableRow;
