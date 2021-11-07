import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Components/Header/Header';
import OptionTab from './Components/OptionsTab/OptionsTab';
import LoadingSpinner from './Components/UIElements/LoadingSpinner';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import './App.css';
import { connect } from 'react-redux';
import Login from './Pages/Login/Login';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from './redux/user/user.selector';


const WareHouseList = lazy(() => import('./Pages/WarehouseList/WareHouseList'));
const AddProduct = lazy(() => import('./Pages/AddProduct/AddProduct.js'));
const AddWarehouse = lazy(() => import('./Pages/AddWarehouse/AddWarehouse.js'));
const AddEnterprise = lazy(() =>
	import('./Pages/AddEnterprise/AddEnterprise.js')
);

function App({userId}) {
	let LoggedInRoute = () => (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Redirect to="/login" />
		</Switch>
	);
	if (userId) {
		LoggedInRoute = () => (
			<Switch>
				<Route exact path="/warehouses" component={WareHouseList} />
				<Route exact path="/addStock" component={AddProduct} />
				<Route exact path="/addWarehouse" component={AddWarehouse} />
				<Route exact path="/addEnterprise" component={AddEnterprise} />
				<Redirect to="/warehouses" />
			</Switch>
		);
	}
	return (
		<div className="App">
			<Header />
			{
				userId && <OptionTab /> 
			}
			<ErrorBoundary>
				<Suspense fallback={<LoadingSpinner />}>
					<LoggedInRoute />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	userId: selectUserId,
});
export default connect(mapStateToProps, null)(App);
