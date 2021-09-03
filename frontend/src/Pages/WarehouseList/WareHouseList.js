import React from 'react';
import TableHeader from '../../Components/TableHeader/TableHeader';
import TableRow from '../../Components/TableRow/TableRow';
import './WareHouseList.css';

const WareHouseList = () => {
	const headers = ['Id', 'WareHouse Name', 'Location', 'Edit', 'Details'];
	const values = [
		{
			name: 'Warehouse 1',
			location: 'Location 1',
		},
		{
			name: 'Warehouse 2',
			location: 'Location 2',
		},
		{
			name: 'Warehouse 3',
			location: 'Location 3',
		},
	];
	return (
		<div className="section">
			<div className="tableContainer">
				<TableHeader headers={headers} />
				{values.map((val, i) => (
					<TableRow key={i} id={i + 1} values={val} />
				))}
			</div>
		</div>
	);
};

export default WareHouseList;
