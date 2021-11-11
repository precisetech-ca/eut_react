import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import {useIinventoryUIContext} from "app/pages/inventory/context/InventoryUIContext";
import { useUIContext } from "app/pages/purchase/context/UIContext";
import {Button, Input, Row, Col} from "reactstrap";
import { Summary } from "./supplier/Summary";
import { ReactTable } from "../../custom_widgets/table/ReactTable";

export function Table({isViewable}) {
  const {  itemMasterToggle } = useIinventoryUIContext();
  const {editMode, setSelectedPartHandler, selectedPart ,toggleVoidHandler ,} = useUIContext();

  const { currentState, inventoryItems } = useSelector(
    (state) => ({ currentState: state.purchase, inventoryItems: state.inventory.inventoryItems }),
    shallowEqual
  );

  const { purchaseDetails, isNewProduct } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
      // const id = window?.location?.pathname?.split('/')[2];
      // dispatch(actions.fetchProductDetails());
  }, []);

  const deleteProduct = (id) => {
    dispatch(actions.deleteProduct(id));
  }

  const columns = [
    {
        Header: () => {
            return <div className="d-flex justify-content-center">SKU</div>
        },
        accessor: "PART_NUMBER",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({value, row }) => {
          return (
            <>
              {!row?.original?.isNew && editMode && value}
              {row?.original?.isNew && 
                <>
                  <Input 
                    type="select" 
                    size="sm"
                    className="d-inline-block" 
                    onChange={(e) => {
                      setSelectedPartHandler(e.currentTarget.value, row.index)
                    }}
                  >
                    <option value="">Please select</option>
                    {inventoryItems?.map(({PAR_ID, PAR_CODE}) => 
                      <option value={PAR_ID} selected={value ? value == PAR_ID : false}>{PAR_CODE}</option>
                    )}
                  </Input>
                  <Button color="dark" size="sm" className="mt-2" onClick={itemMasterToggle}>Create +</Button>
                </>
              }
            </>)
        }
    },
    {
      Header: "Barcode",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({value, row}) => {
        if (row?.original?.PART_NUMBER) {
          return row?.original?.PART_NUMBER;
        } else if (row?.original?.BARCODE_NUMBER) {
          return row?.original?.BARCODE_NUMBER;
        }
      },
    },
    {
      Header: "Desc",
      disableFilters: true,
      disableSortBy: true,
      accessor: "PART_DESCRIPTION",
      Cell: ({value}) => {
        return value;
      },
    },
    {
      Header: "Lot #",
      disableFilters: true,
      disableSortBy: true,
      accessor: "LOT_NUMBER",
      Cell: ({value, row}) => {
        if ( (value || value === null) && !row?.original.isNew ) {
          return value;
        } else {
          return <Input type="text" value={value} onChange={(e) => console.log(e.currentTarget.value)} size="sm" />;
        }
      },
    },
    {
      Header: "Expiry",
      disableFilters: true,
      disableSortBy: true,
      accessor: "EXPIRY_DATE",
      Cell: ({value, row}) => {
        if ( (value || value === null) && !row?.original.isNew ) {
          return value;
        } else {
          return <Input type="datetime-local" value={value} onChange={(e) => console.log(e.currentTarget.value)} size="sm" />;
        }
      },
    },
    {
      Header: "Quarantine",
      disableFilters: true,
      disableSortBy: true,
      accessor: "QUARANTINE_FLAG",
      Cell: ({value}) => {
        return <Input type="checkbox" value={value === "Y" ? true : false} onChange={(e) => console.log(e.currentTarget.value)} size="sm" />;
      },
    },
    {
      Header: "COST",
      disableFilters: true,
      disableSortBy: true,
      accessor: "STANDARD_COST",
      Cell: ({value}) => {
        return <Input 
                  type="text" 
                  readOnly 
                  value={Number(value).toFixed(2)} 
                  size="sm" 
                />;
      },
    },
    {
      Header: "QUANTITY",
      disableFilters: true,
      disableSortBy: true,
      accessor: "QUANTITY",
      Cell: ({value}) => {
        return value;
      },
    },
    {
      Header: "UOM",
      disableFilters: true,
      disableSortBy: true,
      accessor: "REORDERING_UOM",
      Cell: ({value}) => {
        return value;
      }
    },
    {
      disableFilters: true,
      disableSortBy: true,
      Header: "Action",
      Cell: ({row}) => {
        console.log(row.original.PAR_ID);
          return <i 
          class="fa fa-trash text-secondary enable-cursor" 
          aria-hidden="true" 
          disabled={isViewable}
          onClick={(e) => {
            e.preventDefault();
            dispatch(actions.deleteProduct(row.original.PAR_ID))
          }}
          ></i>
      }
    },
];

  return (
    <>
      {purchaseDetails && 
        <ReactTable 
          tableColumns={columns} 
          tableData={purchaseDetails} 
          deleteProduct={deleteProduct} 
          isPaginate={false}
      />}
      {!isViewable && <Row className="mt-4">
        <Col className="col-lg-6">
          <a href="#addproduct" onClick={(e) => {
            e.preventDefault();
            dispatch(actions.addProduct(selectedPart))
          }}>Add a product</a>
        </Col>
      </Row>}  
      
      
      <Row className="mt-4">
        {!isViewable ?  <Col className="col-lg-6">
          <Input type="textarea" placeholder="terms and conditions"/>
        </Col> : <Col className="col-lg-6"></Col>}
      </Row>
      
    </>
  );
}
