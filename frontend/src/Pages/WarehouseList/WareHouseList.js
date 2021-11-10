import React, { useEffect,useState } from 'react';
import TableHeader from '../../Components/TableHeader/TableHeader';
import TableRow from '../../Components/TableRow/TableRow';
import './WareHouseList.css';

const WareHouseList = () => {
	const headers = ['Id', 'WareHouse Name', 'Location', 'Edit', 'Details'];
	const [data, setdata] = useState({
		values : []
	})
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/warehouse/`, {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			},
		  })
		  .then(res => res.json())
		  .then((res) => {
			  console.log(res);
			  let temp=[];
			  for(let i=0;i<res.length;i++){
				  temp.push({
					  name : res[i].Name,
					  location  : res[i].City
				  })
			  }
			  setdata({values : temp});
		  })
	} , []);
	return (
		<div className="section">
			<div className="tableContainer">
				<TableHeader headers={headers} />
				{data.values.map((val, i) => (
					<div key={`WarehouseList_${i}`}>
					<TableRow id={i + 1} values={val} />
					</div>
				))}
			</div>
		</div>
	);
};

export default WareHouseList;
