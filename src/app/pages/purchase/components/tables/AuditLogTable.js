// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/actions";
import { useUIContext } from "../../context/UIContext";
import {Button, Input, Row, Col} from "reactstrap";

import { ReactTable } from "../../../custom_widgets/table/ReactTable";
import DateTimePicker from 'react-datetime-picker';

export function AuditLogTable() {
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
        disableSortBy: true,
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
      disableSortBy: true,
        accessor: "barcode",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
        accessor: "desc",
        Cell: ({value}) => value,
    },
    
    {
      disableSortBy: true,
        accessor: "lot_no",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
        Header: () => <div style={{width: "200px"}}></div>,
        accessor: "expiry",
        Cell: () => <DateTimePicker onChange={onChange} value={value} />
    },
    {
      disableSortBy: true,
        accessor: "oh_qty",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
        accessor: "available_qty",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
      Footer: "uom",
        accessor: "odr_qty",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
      Footer: "uom",
        accessor: "uom",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
      Footer: "Tax",
        accessor: "cost",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
        Header: () => <div style={{width: "200px"}} className="text-center"></div>,
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
      disableSortBy: true,
        accessor: "last_cost",
        Cell: ({value}) => value,
    },
    {
      disableSortBy: true,
        accessor: "sub_total",
        Cell: ({value}) => value
    },
    {
      disableSortBy: true,
        Header: "Action",
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
    </>
  );
}
