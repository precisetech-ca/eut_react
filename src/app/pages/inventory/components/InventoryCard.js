import React, {useMemo} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "_metronic/_partials/controls";
import { InventoryTable } from '../components/InventoryTable';
import { useIinventoryUIContext } from "../context/InventoryUIContext";


export const InventoryCard = () => {
    const inventoryUIContext = useIinventoryUIContext();
    const inventoryUIProps = useMemo(() => {
        return {
            ids: inventoryUIContext.ids,
            newCustomerButtonClick: inventoryUIContext.newCustomerButtonClick,
        };
    }, [inventoryUIContext]);

    const {setEditHandler, setTempData, setIsViewable} = inventoryUIContext;

    return (
        <Card>
            <CardHeader title="Inventory List">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        inventoryUIProps.newCustomerButtonClick();
                        setEditHandler(false);
                        setTempData({});
                        setIsViewable(false);
                    }}
                >
                    New Part
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <InventoryTable />
            </CardBody>
        </Card>
    )
}
