// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { usePartsReturnUIContext } from "../context/PartsReturnUIContext";
import {Button, Input, Row, Col} from "reactstrap";

import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";
import DateTimePicker from 'react-datetime-picker';

export function Table({isViewable}) {
  // Customers UI Context
  const PartsReturnUIContext = usePartsReturnUIContext();
  const {toggleSupplierHandler} = PartsReturnUIContext;
  const [value, onChange] = useState(new Date());
  const customersUIProps = useMemo(() => {
    return {
      queryParams: PartsReturnUIContext.queryParams,
    };
  }, [PartsReturnUIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.partsreturn }),
    shallowEqual
  );
  const {entities , summary } = currentState;

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
      Header: "Items",
      disableFilters: true,
      disableSortBy: true,
        accessor: "barcode",
        Cell: ({value}) => value,
    },
    {
      Header: "SKU",
      disableFilters: true,
      disableSortBy: true,
        accessor: "desc",
        Cell: ({value}) => value,
    },
    
    {
      Header: "Qty",
      disableFilters: true,
      disableSortBy: true,
      accessor: "lot_no",
      Cell: ({value}) => value, 
    },
    {
      Header: "Stocking UOM",
      disableFilters: true,
      disableSortBy: true,
        accessor: "oh_qty",
        Cell: ({value}) => value,
    },
    {
      Header: "Actual Cost",
      disableFilters: true,
      disableSortBy: true,
        accessor: "available_qty",
        Cell: ({value}) => value,
    },
    {
      Header: "Total Cost",
      disableFilters: true,
      disableSortBy: true,
      accessor: "odr_qty",
      Cell: ({value}) => value,
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: "Action",
      accessor: "action",
      Cell: () => {
          return <i 
          class="fa fa-trash text-secondary enable-cursor" 
          aria-hidden="true" 
          disabled={isViewable}
          onClick={(e) => {
            e.preventDefault();
            dispatch(actions.deleteProduct())
          }}
          ></i>
      }
    },
];

  return (
    <>
        <Row>
          <Col sm={12} className='mb-2'>
                    <Button color="dark" 
                            size="sm" 
                            type="button"
                            className="mt-2" 
                            disabled={isViewable}
                            onClick={toggleSupplierHandler}>
                            Add Part
                    </Button>{'  '}
                    <Button color="dark" 
                            size="sm" 
                            type="button"
                            className="mt-2" 
                            disabled={isViewable}
                            onClick={toggleSupplierHandler}>
                            New Part
                    </Button>
          </Col>
        </Row>
      {entities && <ReactTable tableColumns={columns} tableData={entities} deleteProduct={deleteProduct}/>}
      {!isViewable && <Row className="mt-4">
        <Col className="col-lg-6">
          <a href="#addproduct" onClick={(e) => {
            e.preventDefault();
            dispatch(actions.addProduct())
          }}>Add a product</a> 
        </Col>
      </Row>}
      
      
      <Row className="mt-4">
        {!isViewable ?  <Col className="col-lg-6">
          <Input type="textarea" placeholder="terms and conditions"/>
        </Col> : <Col className="col-lg-6"></Col>}
          
        <Col className="col-lg-2"></Col>
        <Col className="col-lg-4">
          <Summary  {...summary}/>
        </Col>
      </Row>
      
    </>
  );
}
