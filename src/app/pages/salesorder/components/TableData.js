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

export function Table({isViewable}) {
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
    (state) => ({ currentState: state.salesorder }),
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
        Header: () => {
            return <div className="d-flex justify-content-center">SKU</div>
        },
        disableSortBy: true,
        accessor: "sku",
        disableFilters: true,
        Cell: ({value}) => {
            if (isViewable) {
              return "SKU-12551"
            } else {
              return (<div style={{width: "200px"}}>
                  <Input type="select" size="sm" className="d-inline-block" name="select" id="exampleSelect">
                      {value?.map(({id, value}) => 
                          <option value={id}>{value}</option>
                      )}
                  </Input>
                  <Button className="mt-2" color="dark" size="sm" >+ Create</Button>
              </div>)
            }
            
        }
    },
    {
      Header: "Barcode",
      disableFilters: true,
      disableSortBy: true,
        accessor: "barcode",
        Cell: ({value}) => value,
    },
    {
      Header: "Desc",
      disableFilters: true,
      disableSortBy: true,
        accessor: "desc",
        Cell: ({value}) => value,
    },
    
    {
      Header: "Lot #",
      disableFilters: true,
      disableSortBy: true,
      accessor: "lot_no",
      Cell: ({value}) => {
        if (isViewable) {
          return value
        }else {
          return <Input type="select" size="sm" placeholder="Enter Batch #" style={{width:"70px"}}/>
        }
      }
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: () => <div style={{width: "200px"}}>Expiry</div>,
      accessor: "expiry",
      Cell: ({value}) => {
        if (isViewable) {
          return value
        }else {
          return <Input
            type="date"
            name="date"
            id="expiry"
            size="sm"
            placeholder="expiry"
          />
        }
      }
    },
    {
      Header: "Oh Qty",
      disableFilters: true,
      disableSortBy: true,
        accessor: "oh_qty",
        Cell: ({value}) => value,
    },
    {
      Header: "Avl Qty",
      disableFilters: true,
      disableSortBy: true,
        accessor: "available_qty",
        Cell: ({value}) => value,
    },
    {
      Header: "Odr Qty",
      disableFilters: true,
      disableSortBy: true,
      accessor: "odr_qty",
      Cell: ({value}) => value,
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: "Cost",
      accessor: "cost",
      Cell: ({value}) => value,
    },
    {
      Header: "Price",
      disableFilters: true,
      disableSortBy: true,
      accessor: "price",
      Cell: ({value}) => value, 
    },
    {
      Header: "Sub Total",
      disableFilters: true,
      disableSortBy: true,
      accessor: "sub_total",
      Cell: ({value}) => value
    },
    {
      Header: "PO #",
      disableFilters: true,
      disableSortBy: true,
      accessor: "po_num",
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
          <Input type="textarea" onChange={(e) => UIContext.setTermsAndConditions(e.target.value)} value={UIContext.termsAndConditions} placeholder="terms and conditions"/>
        </Col> : <Col className="col-lg-6"></Col>}
          
        <Col className="col-lg-2"></Col>
        <Col className="col-lg-4">
          <Summary  {...summary}/>
        </Col>
      </Row>
      
    </>
  );
}
