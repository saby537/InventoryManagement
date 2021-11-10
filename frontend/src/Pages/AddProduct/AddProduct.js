import React, { useState, useEffect } from 'react';
import { VALIDATOR_REQUIRE, VALIDATOR_NUMBER } from '../../utils/validator.js';
import Button from '../../Components/FormElements/Button';
import Input from '../../Components/FormElements/Input';
import { useForm } from '../../Components/hooks/form-hook';
import './AddProduct.css';
import {
  productFields,
  productDetailsFields
} from './productFields';
import img from '../../img/delete.png'


import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectError, selectStockLoading } from '../../redux/Stock/stock.selector';
import { selectUserId } from '../../redux/user/user.selector.js';
import { addStockStart, emptyError } from '../../redux/Stock/stock.actions';

const AddProduct = ({addStock,clearError,userId,isLoading,error}) => {

  const [formState, inputHandler, setFormData] = useForm(
    productFields.fields,
    productFields.isValid
  );

  const [formState2, inputHandler2, setFormData2] = useForm(
    productDetailsFields.fields,
    productDetailsFields.isValid
  );

  
  const [isError, setIsError] = useState('')
  const [supplier, setsupplier] = useState({
    data : []
  })
  const [warehouse, setwarehouse] = useState({
    data : []
  })
  const [items, setItems] = useState({
    data : []
  })
  const [userID, setuserID] = useState('')
  const [Orders, setOrders] = useState({
    orderList: []
  })
  const [ItemList, setItemList] = useState({
    data: []
  })
  const [SupplierList, setSupplierList] = useState({
    data: []
  })
  const [WarehouseList, setWarehouseList] = useState({
    data: []
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
        let temp2 = []
        for(let i = 0; i < res.length; i++){
          temp.push(res[i].Name)
          temp2.push(res[i])
        }
        setsupplier({ data : temp })
        setSupplierList({ data : temp2 })
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
        let temp2 = []
        for(let i = 0; i < res.length; i++){
          temp.push(res[i].Name)
          temp2.push(res[i])
        }
        setwarehouse({ data : temp })
        setWarehouseList({ data : temp2 })
      })
    }


    if(formState.isValid){
      setIsError('false')
      setuserID("Sample User ID")
      if(!items.data.length){
          fetch(`${process.env.REACT_APP_API_URL}/api/item/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(res => res.json())
          .then((res) => {
            let temp = []
            let temp2 = []
            for(let i = 0; i < res.length; i++){
              if(res[i].Quantity > 0){
                temp.push(res[i].Name)
                temp2.push(res[i])
              }
            }
            setItems({ data : temp })
            setItemList({ data : temp2 })
          })
      }
    }
  })

  useEffect(() => {
    if(formState2.inputs.ProductName.value){
      let q = document.forms[1].elements[0].selectedIndex;
      setFormData2(
        {
          ...formState2.inputs,
          Units: { value: ItemList.data[q-1].Unit, isValid: true },
        },
        formState2.isValid
      );
    }
  }, [formState2.inputs.ProductName.value])


  const SubmitHandler = (e) => {
    e.preventDefault()
    let supplier = SupplierList.data[document.getElementById("Supplier").selectedIndex-1]._id;
    let warehouse = WarehouseList.data[document.getElementById("Warehouse").selectedIndex-1]._id;
    let invoice = document.getElementById("Invoice").value;
    let productName = document.getElementById("ProductName").value;
    let quantity = document.getElementById("Quantity").value;
    let units = document.getElementById("Units").value;
    let user = userId;
    let id = Date.now().toString()

    let temp = Orders.orderList;
    temp.push({
      supplier, warehouse, invoice, productName, quantity, units, user, id
    })
    setOrders({ orderList: temp })
  }

  const SubmitOrder = async (event) => {
		event.preventDefault();
    let payload = []
    Orders.orderList.forEach(async (order) => {
      const temp = {
      	ProductName : order.productName,
        Unit : order.units,
        Quantity : order.quantity,
        Supplier : order.supplier,
        Warehouse : order.warehouse,
        Invoice : order.invoice,
        User : order.user
      }
      payload.push(temp)
    })
    await addStock(payload);
	}

  const DeleteItem = (id) => {
    let temp = []
    for (let i = 0; i < Orders.orderList.length; i++) {
      if (Orders.orderList[i].id !== id) { temp.push(Orders.orderList[i]) }
    }
    setOrders({ orderList: temp })
  }

  return (
    <div className="addProduct-section-initial" >
      <h1 className="page-header" style={{ textAlign: "center" }}>Add Stock</h1>
      <form className="addProduct-form" >
        <div className="input-div-stock" >
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
        </div>
      </form>
        {isError === 'true' &&
          <div>
            User does not exist
          </div>
        }
      {formState.isValid && isError === 'false' &&
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
                    finalValue={formState2.inputs.ProductName.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please select a ProductName"
                    onInput={inputHandler2}
                    options={items.data}
                    class="addProduct-input"
                  />
                  <Input
                    element="input"
                    type="text"
                    id="Quantity"
                    placeholder="Quantity"
                    label="Quantity"
                    finalValue={formState2.inputs.Quantity.value}
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
                    finalValue={formState2.inputs.Units.value}
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
            <div style={{ margin: "auto", marginBottom: "85px", minHeight: "347px", maxWidth: "1000px", padding: "10px", maxHeight: "250px", borderRadius: "20px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", overflowY: "auto" }}>
              {/* <MaterialTable title="Stock Details" data={Orders.orderList} columns={columns} /> */}
              {Orders.orderList.length > 0 &&
                <div style={{ padding: "15px", borderRadius: "15px", marginTop: "10px", marginBottom: "10px" }}>
                  {Orders.orderList.map((order, index) => {
                    return (
                      <div id={order.id} style={{ margin: "5px" }} key={`AddProduct_${index}`}>
                        <div className='StockList'>
                          <p style={{ margin: "4px" }}>
                            {order.productName}
                          </p>
                          <p style={{ margin: "4px" }}>
                            Quantity : {order.quantity}
                          </p>
                          <p style={{ margin: "4px" }}>
                            Units : {order.units} <br></br>
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
            <div className="button-div" onClick={SubmitOrder}>
              <Button color="green">
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
};

// export default AddProduct;

const mapDispatchToProps = (dispatch) => ({
	addStock: (stock) => dispatch(addStockStart(stock)),
	clearError: () => dispatch(emptyError()),
	
});
const mapStateToProps = createStructuredSelector({
  userId : selectUserId,
	isLoading: selectStockLoading,
	error: selectError,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
