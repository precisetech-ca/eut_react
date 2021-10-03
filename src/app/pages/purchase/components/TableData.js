// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { useUIContext } from "../context/UIContext";
import {Button, Input, Row, Col} from "reactstrap";
import DateTimePicker from 'react-datetime-picker';
import { Summary } from "./supplier/Summary";

export function Table() {
  // Customers UI Context
  const UIContext = useUIContext();
  const [value, onChange] = useState(new Date());
  const customersUIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      editPurchaseForm: UIContext.editPurchaseForm,
      openDeleteCustomerDialog: UIContext.openDeleteCustomerDialog,
    };
  }, [UIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.purchase }),
    shallowEqual
  );
  const {entities } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }
  

  // Table columns
  const columns = [
    {
      id: "sku",
      name: "SKU",
      selector: ({sku}) => {
        
        return (
        <>
          <Input type="select" name="select" id="exampleSelect">
            {sku.map(({id, value}) => 
              <option value={id}>{value}</option>
            )}
          </Input>
          <Button className="mt-2" color="dark" >+ Create</Button>
        </>)
      },
    },
    {
      id: "barcode",
      name: "Barcode",
      selector: row => row.barcode,
    },
    {
      id: "desc",
      name: "Desc",
      selector: row => row.desc,
    },
    {
      id: "lot_no",
      name: "Lot #",
      selector: row => row.lot_no,
    },
    {
      id: "expiry",
      name: "Expiry",
      width: "300px",
      selector: row => <DateTimePicker
        onChange={(e) => {
            onChange(e);
        }}
        value={value}
        name="expiry"
    />,
    },
    {
      id: "oh_qty",
      name: "OH QTY",
      selector: ({oh_qty}) => oh_qty,
    },
    {
      id: "available_qty",
      name: "Avl Qty",
      selector: ({available_qty}) => available_qty,
    },
    {
      id: "odr_qty",
      name: "Odr Qty",
      selector: ({odr_qty}) => <Input type="text" name="cost" value={odr_qty}  />,
    },
    {
      id: "uom",
      name: "UoM",
      selector: row => row.uom,
    },
    {
      id: "cost",
      name: "Cost",
      selector: ({cost}) => <Input type="text" name="cost" value={cost} readOnly={true} />,
    },
    {
      id: "tax",
      name: "Tax",
      selector: ({tax}) => {
        return (
        <>
          <Input type="select" name="select" id="exampleSelect">
            {tax.map(({id, title}) => 
              <option value={id}>{title}</option>
            )}
          </Input>
        </>)
      },
    },
    {
      id: "last_cost",
      name: "Last Cost",
      selector: row => row.last_cost,
    },
    {
      id: "sub_total",
      name: "Sub Total",
      selector: row => row.sub_total,
    },
    {
      id: "action",
      name: "Action",
      selector: (row) => {
        return <Button color="danger" onClick={() => deleteProduct(row?.id)}>Delete</Button>
      },
    },

  ];
  
  return (
    <>
      <DataTable 
        title="Product List" 
        columns={columns} 
        data={entities?.length > 0 ? entities : []} 
      />

      <Row className="mt-4">
        <Col className="col-lg-6">
          <a href="#addproduct" onClick={(e) => {
            e.preventDefault();
            dispatch(actions.addProduct())
          }}>Add a product</a>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col className="col-lg-6">
          <Input type="textarea" />
        </Col>
        <Col className="col-lg-4"></Col>
        <Col className="col-lg-2">
          <Summary />
        </Col>
      </Row>
      
    </>
  );
}
