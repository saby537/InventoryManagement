import React, { useState, useEffect, useRef } from 'react';
import { VALIDATOR_REQUIRE, VALIDATOR_NUMBER } from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import Input from '../../Components/FormElements/Input';
import { useForm } from '../../Components/hooks/form-hook';
import './AddProduct.css';
import {
  productFields,
  productDetailsFields,
  typeOptions,
  subTypeOptions,
  unitOptions,
} from './productFields';
import MaterialTable from "material-table";
import img from '../../img/delete.png'

import { Form } from 'react-bootstrap'

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectError, selectStockLoading } from '../../redux/Stock/stock.selector';
import { addStockStart, emptyError } from '../../redux/Stock/stock.actions';

const AddProduct = ({addStock,clearError,isLoading,error}) => {

  const [formState, inputHandler, setFormData] = useForm(
    productFields.fields,
    productFields.isValid
  );

  const [formState2, inputHandler2, setFormData2] = useForm(
    productDetailsFields.fields,
    productDetailsFields.isValid
  );

  const [isInitialFormSubmitted, setisInitialFormSubmitted] = useState(false)
  const [supplier, setsupplier] = useState({
    data : []
  })
  const [warehouse, setwarehouse] = useState({
    data : []
  })

  useEffect(() => {
    if(!supplier.data.length){
      fetch(`${process.env.REACT_APP_API_URL}/api/enterprise/supplier/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then((res) => {
        let temp = []
        for(let i = 0; i < res.length; i++){
          temp.push(res[i].Name)
        }
        setsupplier({ data : temp })
      })
    }
    if(!supplier.data.length){
      fetch(`${process.env.REACT_APP_API_URL}/api/warehouse/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then((res) => {
        let temp = []
        for(let i = 0; i < res.length; i++){
          temp.push(res[i].Name)
        }
        console.log(res);
        setwarehouse({ data : temp })
      })
    }
  },[supplier])

  const InitialSubmitHandler = (e) => {
    e.preventDefault()
    setisInitialFormSubmitted(true)
    //   document.getElementById("Supplier").setAttribute("disabled","true");;
    //   document.getElementById("Warehouse").setAttribute("disabled","true");;
    //   document.getElementById("Invoice").setAttribute("disabled","true");;
    //   document.getElementById("User").setAttribute("disabled","true");
    //   // console .log(document.getElementById("AddOrderInfo").innerHTML="Edit Info")
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    let supplier = document.getElementById("Supplier").value;
    let warehouse = document.getElementById("Warehouse").value;
    let invoice = document.getElementById("Invoice").value;
    let productName = document.getElementById("ProductName").value;
    let quantity = document.getElementById("Quantity").value;
    let units = document.getElementById("Units").value;
    let user = document.getElementById("User").value;
    let id = Date.now().toString()

    let temp = Orders.orderList;
    temp.push({
      supplier, warehouse, invoice, productName, quantity, units, user, id
    })
    // temp.push({
    //   productName,quantity,units
    // })
    setOrders({ orderList: temp })
    console.log(Orders.orderList);
  }

  const submitHandler = async (event) => {
		event.preventDefault();
		const payload = {
			Name : formState.inputs.name.value,
			Address : formState.inputs.address.value,
			PAN : formState.inputs.pan.value,
			GSTNumber : formState.inputs.gst.value,
			PINCode : formState.inputs.pincode.value,
			PhoneNo : formState.inputs.phone.value,
			EmailID : formState.inputs.email.value,
			Type : formState.inputs.type.value,
		}
		console.log(payload);
		await addStock(payload);
	}

  const DeleteItem = (id) => {
    let temp = []
    for (let i = 0; i < Orders.orderList.length; i++) {
      if (Orders.orderList[i].id != id) { temp.push(Orders.orderList[i]) }
    }
    setOrders({ orderList: temp })
  }

  const [Orders, setOrders] = useState({
    orderList: []
  })

  return (
    <div className="addProduct-section-initial" >
      <h1 className="page-header" style={{ textAlign: "center" }}>Add Stock</h1>
      <form className="addProduct-form" >
        <div className="input-div" >
          <Input
            element="select"
            type="options"
            id="Supplier"
            placeholder="Supplier"
            label="Supplier"
            initialValue={formState.inputs.Supplier.value}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a supplier"
            onInput={inputHandler}
            options={supplier.data}
            class="addProduct-input"
          />
          <Input
            element="select"
            type="options"
            id="Warehouse"
            placeholder="Warehouse"
            label="Warehouse"
            initialValue={formState.inputs.Warehouse.value}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a Warehouse"
            onInput={inputHandler}
            options={warehouse.data}
            class="addProduct-input"
          />
          <Input
            element="input"
            type="text"
            id="Invoice"
            placeholder="Invoice"
            label="Invoice"
            initialValue={formState.inputs.Invoice.value}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide Invoice"
            onInput={inputHandler}
            class="addProduct-input"
          />
          <Input
            element="input"
            type="text"
            id="User"
            placeholder="User"
            label="User"
            initialValue={formState.inputs.User.value}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide Invoice"
            onInput={inputHandler}
            class="addProduct-input"
          />
        </div>
        {/* <div className="button-div" >
					<Button color="green" disabled={!formState.isValid} onClick={InitialSubmitHandler} id="AddOrderInfo">
						Add Info
					</Button>
				</div> */}
      
      {formState.isValid &&
        <div className='StockShow'>
          <div>
            <h1 className="page-header" style={{ textAlign: "center", marginTop: "20px" }}>Add Product</h1>
            <div style={{ display: "block", marginTop: "20px" }}>
              <form className="addProduct-form">
                <div className="input-div2">
                  <Input
                    element="select"
                    type="options"
                    id="ProductName"
                    placeholder="ProductName"
                    label="ProductName"
                    initialValue={formState2.inputs.ProductName.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please select a ProductName"
                    onInput={inputHandler2}
                    options={["gsfag", "asdfbdbsdfdghsf"]}
                    class="addProduct-input"
                  />
                  <Input
                    element="input"
                    type="text"
                    id="Quantity"
                    placeholder="Quantity"
                    label="Quantity"
                    initialValue={formState2.inputs.Quantity.value}
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
                    errorText="Please input a Quantity"
                    onInput={inputHandler2}
                    class="addProduct-input"
                  />
                  <Input
                    element="input"
                    type="text"
                    id="Units"
                    placeholder="Units"
                    label="Units"
                    initialValue={formState2.inputs.Units.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please provide Units"
                    onInput={inputHandler2}
                    class="addProduct-input"
                  />
                </div>
                <div className="button-div">
                  <Button color="green" disabled={!formState2.isValid} onClick={SubmitHandler}>
                    Add Stock
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div style={{ margin: "auto", marginTop: "20px", textAlign: "center" }}>
              <h1>Stocks</h1>
            </div>
            <div style={{ margin: "auto", marginBottom: "85px", minHeight: "350px", maxWidth: "1000px", padding: "10px", maxHeight: "250px", borderRadius: "20px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", overflowY: "scroll" }}>
              {/* <MaterialTable title="Stock Details" data={Orders.orderList} columns={columns} /> */}
              {Orders.orderList.length > 0 &&
                <div style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding: "15px", borderRadius: "15px", marginTop: "10px", marginBottom: "10px" }}>
                  {Orders.orderList.map((order, index) => {
                    return (
                      <div id={order.id} style={{ margin: "5px" }}>
                        <div className='StockList'>
                          <p style={{ margin: "4px" }}>
                            {order.productName}
                          </p>
                          <p style={{ margin: "4px" }}>
                            Quantity : {order.quantity}
                          </p>
                          <p style={{ margin: "4px" }}>
                            {/* Invoice : {order.invoice} <br></br> */}
                            Units : {order.units} <br></br>
                            {/* Supplier : {order.supplier} <br></br> */}
                            {/* Warehouse : {order.warehouse} <br></br> */}
                            {/* User : {order.user} */}
                          </p>
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div color="red" style={{ textAlign: "right", backgroundImage: `url(${img})`, width: "30px", height: "32px" }} onClick={() => { DeleteItem(order.id) }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              }
            </div>
            <div className="button-div" onClick={submitHandler}>
              <Button color="green">
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      }
      </form>
    </div>
  );
};

// export default AddProduct;

const mapDispatchToProps = (dispatch) => ({
	addStock: (stock) => dispatch(addStockStart(stock)),
	clearError: () => dispatch(emptyError()),
	
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectStockLoading,
	error: selectError,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
