import React from 'react';
import './TableHeader.css';

const TableHeader = ({ headers }) => {
	return (
		<div className="header-container">
			{headers.map((item, i) => (
				<label key={i} className="header-label">
					{item}
				</label>
			))}
		</div>
	);
};

export default TableHeader;
