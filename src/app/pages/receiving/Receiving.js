import React from "react";
import { Route, Switch } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { EditReceivingOrder } from "./components/module/EditReceivingOrder";
import { HomePageCard } from "./components/HomePageCard";
import { NewReceivingOrder } from "./components/module/NewReceivingOrder";
import { SupplierForm } from "./components/forms/SupplierForm";
import { ViewReceivingOrder } from "./components/module/ViewReceivingOrder";

const Receiving = ({dispatch, history}) => {
    const receivingUIEvents = {
        newReceivingForm: () => {
          history.push("/receiving/new");
        },
        editReceivingForm: (id) => {
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
            <NewReceivingOrder />
          )}
        </Route>
        <Route exact path="/receiving/:id/edit">
          {({ history, match }) => (
            <EditReceivingOrder />
          )}
        </Route>
        <Route exact path="/receiving/:id/view">
          {({ history, match }) => (
            <ViewReceivingOrder />
          )}
        </Route>
        <Route exact path="/receiving">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      <SupplierForm />
    </UIProvider>
  );
}

export default Receiving;