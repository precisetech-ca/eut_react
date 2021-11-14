/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState ,  useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as inventoryActions from '../../../../app/pages/inventory/_redux/actions';


export function AdvanceTablesWidget7({ className }) {
  
  const dispatch = useDispatch();
  const { inventoryState, userData } = useSelector(
    (state) => ({ 
      inventoryState: state.inventory,
      userData: state.auth.user,
    }),
    shallowEqual
  );
    const {receivingList} = inventoryState;
  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Inventory List
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ width: "100px" }} >Receiving #</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Receiving Date</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Supplier</th>
                <th className="p-0" style={{ minWidth: "100px" }} > Supplier Invoice</th>
                <th className="p-0" style={{ minWidth: "100px" }} > PO Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light mr-1">
                  REC000211
                  </div>
                </td>
                <td className="pl-0">
                  <div>
                  1998-01-11T00:00:00-08:00
                  </div>
                </td>
                <td className="pl-0">
                <div>
                  MARGARET YANISH	
                  </div>
                </td>
                <td className="">
                  <span className="text-muted font-weight-500">
                  23
                  </span>
                </td>
                <td className="">
                  <span className="label label-lg label-light-primary label-inline">
                  PO000008 
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
