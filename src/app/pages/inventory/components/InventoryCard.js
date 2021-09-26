import React, {useMemo} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "_metronic/_partials/controls";
import { CustomersFilter } from "../filters/InventoryFilter";
import { CustomersGrouping } from "../grouping/InventoryGrouping";
import { InventoryTable } from '../components/InventoryTable';
import { useCustomersUIContext } from "../context/InventoryUIContext";


export const InventoryCard = () => {
    const customersUIContext = useCustomersUIContext();
    const customersUIProps = useMemo(() => {
        return {
        ids: customersUIContext.ids,
        newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
        };
    }, [customersUIContext]);


    return (
        <Card>
            <CardHeader title="Inventory List">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={customersUIProps?.newCustomerButtonClick}
                >
                    New Part
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <CustomersFilter />
                {customersUIProps?.ids?.length > 0 && <CustomersGrouping />}
                <InventoryTable />
            </CardBody>
            </Card>
    )
}
