import React from "react";
import { Route, Switch } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { EditPurchaseOrder } from "./components/module/EditPurchaseOrder";
import { HomePageCard } from "./components/HomePageCard";
import { NewPurchaseOrder } from "./components/module/NewPurchaseOrder";
import { SupplierForm } from "./components/forms/SupplierForm";
import { ViewPurchaseOrder } from "./components/module/ViewPurchaseOrder";

const Purchase = ({dispatch, history}) => {
    const purchaseUIEvents = {
        newPurchaseForm: () => {
          history.push("/purchase/new");
        },
        editPurchaseForm: (id) => {
          history.push(`/purchase/${id}/edit`);
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
    <UIProvider purchaseUIEvents={purchaseUIEvents}>
      <Switch>
        <Route exact path="/purchase/new">
          {({ history, match }) => (
            <NewPurchaseOrder />
          )}
        </Route>
        <Route exact path="/purchase/:id/edit">
          {({ history, match }) => (
            <EditPurchaseOrder />
          )}
        </Route>
        <Route exact path="/purchase/:id/view">
          {({ history, match }) => (
            <ViewPurchaseOrder />
          )}
        </Route>
        <Route exact path="/purchase">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      <SupplierForm />
    </UIProvider>
  );
}

export default Purchase;