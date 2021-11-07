import React from 'react';
import Button from '../../Components/FormElements/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from '../../redux/user/user.selector';
import { logOut } from '../../redux/user/user.actions';
import './Header.css';

const Header = ({ userId, startLogOut, showArrow }) => {
	return (
		<header className="header">
			<label className="header-value">REIL</label>
			{userId && (
				<Button type="submit" onClick={startLogOut} logOut>
					Log Out
				</Button>
			)}
		</header>
	);
};

const mapStateToProps = createStructuredSelector({
	userId: selectUserId,
});
const mapDispatchToProps = (dispatch) => ({
	startLogOut: (user) => dispatch(logOut()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
