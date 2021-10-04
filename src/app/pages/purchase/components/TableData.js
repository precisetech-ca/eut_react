// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { useUIContext } from "../context/UIContext";
import {Button, Input, Row, Col} from "reactstrap";

import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import DateTimePicker from 'react-datetime-picker';

export function Table() {
  // Customers UI Context
  const UIContext = useUIContext();
  const [value, onChange] = useState(new Date());
  const customersUIProps = useMemo(() => {
    return {
      queryParams: UIContext.queryParams,
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

  const columns = [
    {
        Header: () => {
            return <div className="d-flex justify-content-center">SKU</div>
        },
        Footer: "SKU",
        accessor: "sku",
        disableFilters: true,
        Cell: ({value}) => {
            return (<div style={{width: "200px"}}>
                <Input type="select" className="d-inline-block" name="select" id="exampleSelect">
                    {value?.map(({id, value}) => 
                        <option value={id}>{value}</option>
                    )}
                </Input>
                <Button className="mt-2" color="dark" >+ Create</Button>
            </div>)
        }
    },
    {
        Header: "Barcode",
        Footer: "Barcode",
        accessor: "barcode",
        Cell: ({value}) => value,
    },
    {
        Header: "Desc",
        Footer: "Desc",
        accessor: "desc",
        Cell: ({value}) => value,
    },
    
    {
        Header: "Lot #",
        Footer: "Lot #",
        accessor: "lot_no",
        Cell: ({value}) => value,
    },
    {
        Header: () => <div style={{width: "250px"}}>Expiry</div>,
        Footer: "Expiry",
        accessor: "expiry",
        Cell: () => <DateTimePicker onChange={onChange} value={value} />
    },
    {
        Header: "OH QTY",
        Footer: "OH QTY",
        accessor: "oh_qty",
        Cell: ({value}) => value,
    },
    {
        Header: "Avl Qty",
        Footer: "Avl Qty",
        accessor: "available_qty",
        Cell: ({value}) => value,
    },
    {
        Header: "Odr Qty",
        Footer: "Odr Qty",
        accessor: "odr_qty",
        Cell: ({value}) => value,
    },
    {
        Header: "UoM",
        Footer: "UoM",
        accessor: "uom",
        Cell: ({value}) => value,
    },
    {
        Header: "Cost",
        Footer: "Cost",
        accessor: "cost",
        Cell: ({value}) => value,
    },
    {
        Header: () => <div style={{width: "200px"}} className="text-center">Tax</div>,
        Footer: "Tax",
        accessor: "tax",
        disableFilters: true,
        Cell: ({value}) => <Input type="select" className="d-inline-block" name="select" id="exampleSelect">
            {value?.map(({id, title}) => 
                <option value={id}>{title}</option>
            )}
        </Input>,
    },
    {
        Header: "Last Cost",
        Footer: "Last Cost",
        accessor: "last_cost",
        Cell: ({value}) => value,
    },
    {
        Header: "Sub Total",
        Footer: "Sub Total",
        accessor: "sub_total",
        Cell: ({value}) => value
    },
    {
        Header: "Action",
        Footer: "Sub Total",
        accessor: "action",
        disableFilters: true,
        Cell: () => {
            return <Button color="danger">Delete</Button>
        }
    },
];

  return (
    <>
      {entities && <ReactTable tableColumns={columns} tableData={entities} deleteProduct={deleteProduct}/>}

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
        <Col className="col-lg-2"></Col>
        <Col className="col-lg-4">
          <Summary />
        </Col>
      </Row>
      
    </>
  );
}
