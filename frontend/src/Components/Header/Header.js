import React from 'react';
import Button from '../../Components/FormElements/Button';
import './Header.css';

const Header = () => {
	return (
		<header className="header">
			<label className="header-value">REIL Inventory Manager</label>
			<Button type="submit">Log Out</Button>
		</header>
	);
};

export default Header;
