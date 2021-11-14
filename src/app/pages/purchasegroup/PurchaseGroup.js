import React from "react";
import { Route, Switch } from "react-router-dom";
import { PurchaseGroupUIProvider } from "./context/PurchaseGroupUIContext";
import { HomePageCard } from "./components/HomePageCard";
import { SupplierForm } from "./components/forms/SupplierForm";

const PurchaseGroup = ({dispatch, history}) => {
    const purchasegroupUIEvents = {
        newPurchaseGroupForm: () => {
          history.push("/purchasegroup/new");
        },
        editPurchaseGroupForm: (id) => {
          history.push(`/purchasegroup/${id}/edit`);
        },
    }
    

  return (
    <PurchaseGroupUIProvider purchasegroupUIEvents={purchasegroupUIEvents}>
      <Switch>

        <Route exact path="/purchasegroup">
          {({ history, match }) => (
            <HomePageCard />
          )}
        </Route>
      </Switch>
      <SupplierForm />
    </PurchaseGroupUIProvider>
  );
}

export default PurchaseGroup;