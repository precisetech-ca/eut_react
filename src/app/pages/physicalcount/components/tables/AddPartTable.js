import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/actions";
import { usePhysicalCountUIContext } from "../../context/PhysicalCountUIContext";
import {Input} from "reactstrap";
import { ReactTable } from "../../../custom_widgets/table/ReactTable";

export function AddPartTable() {
  // Customers UI Context
  const PhysicalCountUIContext = usePhysicalCountUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: PhysicalCountUIContext.queryParams,
    };
  }, [PhysicalCountUIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ 
        currentState: state.physicalcount, 
        fullfilments: state.physicalcount.fullfilments
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
        Header: "BARCODE_NUMBER ",
        disableSortBy: true,
        disableFilters: true,
        accessor: "expire",
        Cell: ({value}) => value
      
    },
    {
        Header: "PART_NUMBER",
        disableSortBy: true,
        disableFilters: true,
        accessor: "item_num",
        Cell: ({value}) => value
    },
    {
        Header: "DESCRIPTION",
        disableSortBy: true,
        disableFilters: true,
        accessor: "sku",
        Cell: ({value}) => value
    },
    
    {
      Header: "GROUP_CODE",
      disableSortBy: true,
      disableFilters: true,
      accessor: "batch_num",
      Cell: ({value}) => <Input type="select" checked={value} value={value}></Input>
    },
    
];

  return (
    <>
      {fullfilments && <ReactTable tableColumns={columns} tableData={fullfilments} deleteProduct={deleteProduct}/>}
    </>
  );
}
