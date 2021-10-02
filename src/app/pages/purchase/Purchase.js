import React from "react";
import { Route } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { TableCard } from "./components/TableCard";
import { EditDialog } from "./components/EditDialog";

const Purchase = ({dispatch, history}) => {
    const customersUIEvents = {
        newCustomerButtonClick: () => {
          history.push("/purchase/new");
        },
        openEditCustomerDialog: (id) => {
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
    <UIProvider customersUIEvents={customersUIEvents}>
        <Route path="/purchase/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchase");
            }}
          />
        )}
      </Route>
      <Route path="/purchase/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/purchase");
            }}
          />
        )}
      </Route>
      <TableCard />
    </UIProvider>
  );
}

export default Purchase;