/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import * as purchaseActions from "../../../../app/pages/purchase/_redux/actions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";


export function AdvanceTablesWidget2({ className }) {
  const dispatch = useDispatch();

  const { purchaseState  } = useSelector(
    (state) => ({
      purchaseState: state.purchase,
    }),
    shallowEqual
  );

  const { purchaseList } = purchaseState;

  useEffect(() => {    
      dispatch(purchaseActions.fetchPurchaseList());
  }, []);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Purchase Order Listing
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ width: "100px" }}>
                  PO #
                </th>
                <th className="p-0" style={{ minWidth: "100px" }}>
                  PO Date
                </th>
                <th className="p-0" style={{ minWidth: "160px" }}>
                  Lead Time
                </th>
                <th className="p-0" style={{ minWidth: "100px" }}>
                  Supplier
                </th>
                <th className="p-0" style={{ minWidth: "150px" }}>
                  Warehouse
                </th>
              </tr>
            </thead>
            {/* {
              purchaseList.map(({PO_NUMBER , PO_DATE , SUPPLIER , INVENTORY })=> {
              return (
                <tbody>
                  <tr>
                    <td className="pl-0 py-4">
                      <div className="symbol symbol-50 symbol-light mr-1">
                        {PO_NUMBER}
                      </div>
                    </td>
                    <td className="pl-0">
                      <div>{PO_DATE}</div>
                    </td>
                    <td className="pl-0"></td>
                    <td className="">
                      <span className="text-muted font-weight-500">
                        {SUPPLIER}
                      </span>
                    </td>
                    <td className="">
                      <span className="label label-lg label-light-primary label-inline">
                        {INVENTORY}
                      </span>
                    </td>
                  </tr>
                </tbody>
              );
            })} */}
          </table>
        </div>
      </div>
    </div>
  );
}
