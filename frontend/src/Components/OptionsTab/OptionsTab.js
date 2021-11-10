import React from 'react';
import Button from '../FormElements/Button';
import './OptionTab.css';

const OptionTab = () => {
	return (
		<div className="section optionTab-section" style={{display:"flex", justifyContent:"center",gap:"10px",flexWrap: "wrap"}}>
			<Button color="green" to="/addProduct" customColor>
				Add Product
			</Button>
			<Button color="red" to="/addStock" customColor>
				Add Stock
			</Button>
			<Button color="blue" to="/addWarehouse" customColor>
				Add Warehouse
			</Button>
			<Button color="#cf0003" to="/addEnterprise" customColor>
				Add Enterprise
			</Button>
			<Button color="#EED202" to="/warehouses" customColor>
				View Inventory
			</Button>
		</div>
	);
};

export default OptionTab;
