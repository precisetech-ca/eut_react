import React from "react";
import { Route } from "react-router-dom";
import { CustomersUIProvider } from "./context/InventoryUIContext";
import { InventoryCard } from "./components/InventoryCard";
import { InventoryEditDialog } from "./components/EditInventoryDialog";

const Inventory = ({dispatch, history}) => {
    const customersUIEvents = {
        newCustomerButtonClick: () => {
          history.push("/inventory/new");
        },
        openEditCustomerDialog: (id) => {
          history.push(`/inventory/${id}/edit`);
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
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
        <Route path="/inventory/new">
          {({ history, match }) => (
            <InventoryEditDialog
              show={match != null}
              onHide={() => {
                history.push("/inventory");
              }}
            />
          )}
        </Route>
        <Route path="/inventory/:id/edit">
          {({ history, match }) => (
          <InventoryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/inventory");
            }}
          />
        )}
      </Route>
        <InventoryCard />
    </CustomersUIProvider>
  );
}

export default Inventory;