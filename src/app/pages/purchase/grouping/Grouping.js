import React, { useMemo } from "react";
import { useUIContext } from "../context/UIContext";

export function Grouping() {
  // Customers UI Context
  const UIContext = useUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      openDeleteCustomersDialog: UIContext.openDeleteCustomersDialog,
      openFetchCustomersDialog: UIContext.openFetchCustomersDialog,
      openUpdateCustomersStatusDialog:
        UIContext.openUpdateCustomersStatusDialog,
    };
  }, [UIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{customersUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={customersUIProps.openDeleteCustomersDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={customersUIProps.openFetchCustomersDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={customersUIProps.openUpdateCustomersStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
