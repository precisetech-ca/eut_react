import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import {Button, Input, Row, Col} from "reactstrap";

import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";

export function Table({isViewable}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.purchase }),
    shallowEqual
  );

  const { entities } = currentState;

  console.log(entities);

  const dispatch = useDispatch();
  useEffect(() => {
      // const id = window?.location?.pathname?.split('/')[2];
      dispatch(actions.fetchProductDetails());
  }, []);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const columns = [
    {
        Header: () => {
            return <div className="d-flex justify-content-center">PART_NUMBER</div>
        },
        disableSortBy: true,
        accessor: "PART_NUMBER",
        disableFilters: true,
        Cell: ({value, row }) => {
          return value
            if (isViewable) {
              return "SKU-12551"
            } else {
              return (<div style={{width: "200px"}}>
                <Input type="select" size="sm" className="d-inline-block" name="select" id="exampleSelect">
                    {value?.map(({id, value}) => 
                        <option value={id}>{value}</option>
                    )}
                </Input>
            
                {entitiesLength - row?.index && <Button className="mt-2" color="dark" size="sm" >+ Create</Button>}
              </div>)
            }
            
        }
    },
    {
      Header: "PART DESCRIPTION",
      disableFilters: true,
      disableSortBy: true,
      accessor: "PART_DESCRIPTION",
      Cell: ({value}) => value,
    },
    {
      Header: "COST",
      disableFilters: true,
      disableSortBy: true,
      accessor: "COST",
      Cell: ({value}) => value,
    },

    {
      Header: "LAST COST",
      disableFilters: true,
      disableSortBy: true,
      accessor: "LAST_COST",
      Cell: ({value}) => value,
    },
    {
      Header: "STANDARD COST",
      disableFilters: true,
      disableSortBy: true,
      accessor: "STANDARD_COST",
      Cell: ({value}) => value,
    },
    {
      Header: "QUANTITY",
      disableFilters: true,
      disableSortBy: true,
      accessor: "QUANTITY",
      Cell: ({value}) => value,
    },
    
    // {
    //   Header: "Barcode",
    //   disableFilters: true,
    //   disableSortBy: true,
    //     accessor: "barcode",
    //     Cell: ({value}) => value,
    // },
    // {
    //   Header: "Desc",
    //   disableFilters: true,
    //   disableSortBy: true,
    //     accessor: "desc",
    //     Cell: ({value}) => value,
    // },
    
    {
      Header: "REORDERING UOM",
      disableFilters: true,
      disableSortBy: true,
      accessor: "REORDERING_UOM",
      Cell: ({value}) => {
        return value;
        // if (isViewable) {
        //   return value
        // }else {
        //   return <Input type="text" size="sm" style={{width:"70px"}}/>
        // }
      }
    },
    // {
    //   disableFilters: true,
    //   disableSortBy: true,
    //   Header: () => <div style={{width: "200px"}}>Expiry</div>,
    //   accessor: "expiry",
    //   Cell: ({value}) => {
    //     if (isViewable) {
    //       return value
    //     }else {
    //       return <Input
    //         type="date"
    //         name="date"
    //         id="expiry"
    //         size="sm"
    //         placeholder="expiry"
    //       />
    //     }
    //   }
    // },
    // {
    //   Header: "Quarantine",
    //   disableFilters: true,
    //   disableSortBy: true,
    //   accessor: "quarantine",
    //   Cell: ({value}) => (<div className="align-items-center d-flex justify-content-center mt-5">
    //     <Input type="checkbox" disabled={true} />
    //   </div>),
    // },
    // {
    //   Header: "Oh Qty",
    //   disableFilters: true,
    //   disableSortBy: true,
    //     accessor: "oh_qty",
    //     Cell: ({value}) => value,
    // },
    // {
    //   Header: "Avl Qty",
    //   disableFilters: true,
    //   disableSortBy: true,
    //     accessor: "available_qty",
    //     Cell: ({value}) => value,
    // },
    // {
    //   Header: "Odr Qty",
    //   disableFilters: true,
    //   disableSortBy: true,
    //   accessor: "odr_qty",
    //   Cell: ({value}) => value,
    // },
    // {
    //   disableFilters: true,
    //   disableSortBy: true,
    //   Header: "UoM",
    //   accessor: "uom",
    //   Cell: ({value}) => value,
    // },
    // {
    //   disableFilters: true,
    //   disableSortBy: true,
    //   Header: "Cost",
    //   accessor: "cost",
    //   Cell: ({value}) => value,
    // },
    // {
    //   Header: "Last Cost",
    //   disableFilters: true,
    //   disableSortBy: true,
    //   accessor: "last_cost",
    //   Cell: ({value}) => value,
    // },
    // {
    //   Header: "Sub Total",
    //   disableFilters: true,
    //   disableSortBy: true,
    //   accessor: "sub_total",
    //   Cell: ({value}) => value
    // },
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
          <Input type="textarea" placeholder="terms and conditions"/>
        </Col> : <Col className="col-lg-6"></Col>}
          
        <Col className="col-lg-2"></Col>
        <Col className="col-lg-4">
          <Summary />
        </Col>
      </Row>
      
    </>
  );
}
