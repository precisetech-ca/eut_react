import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { Input, Row, Col} from "reactstrap";
import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";

export function Table() {
  // Getting curret state of customers list from store (Redux)
  const dispatch = useDispatch();
  
  const { currentState } = useSelector(
    (state) => ({ currentState: state.receiving }),
    shallowEqual
  );

  const {products, summary} = currentState;

  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const changeRecQty = (qty, index) => {
    dispatch(actions.changeRecQty({qty, index}));
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
            return value;
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
      Header: "Description",
      disableFilters: true,
      disableSortBy: true,
        accessor: "description",
        Cell: ({value}) => value,
    },
    
    {
      Header: "Lot #",
      disableFilters: true,
      disableSortBy: true,
      accessor: "lot_no",
      Cell: ({value}) => value,
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: () => <div style={{width: "50px"}}>Expiry</div>,
      accessor: "expiry",
      Cell: ({value}) => value
    },
    {
      Header: "Order Qty",
      disableFilters: true,
      disableSortBy: true,
      accessor: "odr_qty",
      Cell: ({value}) => value,
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: "UoM",
      accessor: "uom",
      Cell: ({value}) => {
        return <select className="form-control form-control-sm">
          {value?.map(v => <option value={v.id} >{v.title}</option>)}
        </select>
      },
    },
    {
      Header: "Rec Qty",
      disableFilters: true,
      disableSortBy: true,
      accessor: "rec_qty",
      Cell: ({value, row}) => 
        <Input  
          type="number" 
          min={1}
          onChange={(e) => changeRecQty(e.target.value, row?.index)} 
          size="sm" 
          style={{width:"70px"}} 
          value={value}
        />,
    },
    {
      Header: "Oh Qty",
      disableFilters: true,
      disableSortBy: true,
        accessor: "oh_qty",
        Cell: ({value}) => value,
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: "Rem Cost",
      accessor: "rem_cost",
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
      Header: "Last Cost",
      disableFilters: true,
      disableSortBy: true,
      accessor: "last_cost",
      Cell: ({value}) => value,
    },
    {
      Header: "Sub Total",
      disableFilters: true,
      disableSortBy: true,
      accessor: "sub_total",
      Cell: ({value}) => value
    }
];

  return (
    <>
      {products && <ReactTable tableColumns={columns} tableData={products} deleteProduct={deleteProduct}/>}
      <Row className="mt-4">
        <Col className="col-lg-6">
          <Input type="textarea" placeholder="terms and conditions"/>
        </Col>
        <Col className="col-lg-2"></Col>
        <Col className="col-lg-4">
          <Summary {...summary}/>
        </Col>
      </Row>
      
    </>
  );
}
