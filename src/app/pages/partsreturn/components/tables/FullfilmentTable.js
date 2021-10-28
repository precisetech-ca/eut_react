// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/actions";
import { usePartsReturnUIContext } from "../../context/PartsReturnUIContext";
import {Button, Input, Row, Col} from "reactstrap";


import { ReactTable } from "../../../custom_widgets/table/ReactTable";

export function FullfilmentTable(isViewable) {
  // Customers UI Context
  const PartsReturnUIContext = usePartsReturnUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: PartsReturnUIContext.queryParams,
    };
  }, [PartsReturnUIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ 
        currentState: state.partsreturn, 
        fullfilments: state.partsreturn.fullfilments
    }),
    shallowEqual
  );
  const { fullfilments } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fullfilmentDataAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const columns = [
    {
        Header: "Product",
        disableSortBy: true,
        disableFilters: true,
        accessor: "product",
        Cell: ({value}) => {
                   return (<div style={{width: "200px"}}>
                <Input type="select" size="sm" className="d-inline-block" name="select" id="exampleSelect">
                    {value?.map(({id, title}) => 
                        <option value={id}>{title}</option>
                    )}
                </Input>
            </div>)
          
          
      }
    },
    {
        Header: "Item #",
        disableSortBy: true,
        disableFilters: true,
        accessor: "item_num",
        Cell: ({value}) => value
    },
    {
        Header: "SKU",
        disableSortBy: true,
        disableFilters: true,
        accessor: "sku",
        Cell: ({value}) => value
    },
    {
      Header: "Category",
      disableSortBy: true,
      disableFilters: true,
      accessor: "category",
      Cell: ({value}) => value
    },
    {
      Header: "Batch #",
      disableSortBy: true,
      disableFilters: true,
      accessor: "batch_num",
      Cell: ({value}) => <Input type="select" checked={value} value={value}></Input>
    },
    {
      Header: "Expiry",
      accessor: "expire",
      disableFilters: true,
      Cell: ({value}) => value,
    },
    {
      Header: "Qty on Hand",
      disableSortBy: true,
      disableFilters: true,
      accessor: "qty_on_hand",
      Cell: ({value}) => value
    },
    {
      Header: "Qty Ordered",
      disableSortBy: true,
      disableFilters: true,
      accessor: "qty_ordered",
      Cell: ({value}) => value
    },
    {
      Header: "Qty Remaining",
      disableSortBy: true,
      disableFilters: true,
      accessor: "qty_remaining",
      Cell: ({value}) => value
    },
    {
      Header: "Status",
      disableSortBy: true,
      disableFilters: true,
      accessor: "status",
      Cell: ({value}) => value
    },
];

  return (
    <>
      {fullfilments && <ReactTable tableColumns={columns} tableData={fullfilments} deleteProduct={deleteProduct}/>}
    </>
  );
}
