import React from "react";
import { Route, Switch } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { EditPurchaseOrder } from "./components/EditPurchaseOrder";
import { HomePageCard } from "./components/HomePageCard";
import { NewPurchaseOrder } from "./components/NewPurchaseOrder";
import { SupplierForm } from "./components/forms/SupplierForm";

const Receiving = ({dispatch, history}) => {
    const receivingUIEvents = {
        newPurchaseForm: () => {
          history.push("/receiving/new");
        },
        editPurchaseForm: (id) => {
          history.push(`/receiving/${id}/edit`);
        },
        openDeleteCustomerDialog: (id) => {
          history.push(`/e-commerce/customers/${id}/delete`);
        },
        openDeleteCustomersDialog: () => {
          history.push(`/e-commerce/customers/deleteCustomers`);
        },
        openFetchCustomersDialog: () => {
          history.push(`/e-commerce/customers/fetch`);
        },
        openUpdateCustomersStatusDialog: () => {
          history.push("/e-commerce/customers/updateStatus");
        }
    }
    

  return (
    <UIProvider receivingUIEvents={receivingUIEvents}>
      <Switch>
        <Route exact path="/receiving/new">
          {({ history, match }) => (
            <NewPurchaseOrder />
          )}
        </Route>
        <Route exact path="/receiving/:id/edit">
          {({ history, match }) => (
            <EditPurchaseOrder />
          )}
        </Route>
        <Route exact path="/receiving">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      {/* <SupplierForm /> */}
    </UIProvider>
  );
}

export default Receiving;