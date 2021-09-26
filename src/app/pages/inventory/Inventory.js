import React from "react";
import { CustomersUIProvider } from "./context/InventoryUIContext";
import { InventoryCard } from "./components/InventoryCard";

const Inventory = ({dispatch, history}) => {
    const customersUIEvents = {
        newCustomerButtonClick: () => {
          history.push("/e-commerce/customers/new");
        },
        openEditCustomerDialog: (id) => {
          history.push(`/e-commerce/customers/${id}/edit`);
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
        <InventoryCard />
    </CustomersUIProvider>
  );
}

export default Inventory;