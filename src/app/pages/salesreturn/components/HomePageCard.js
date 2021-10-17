import React, {useMemo} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from "_metronic/_partials/controls";
import { useUIContext } from "../context/UIContext";
import { HomePageTable } from './HomePageTable';

export const HomePageCard = () => {
    const UIContext = useUIContext();
    const customersUIProps = useMemo(() => {
        return {
            ids: UIContext.ids,
            newSalesOrderForm: UIContext.newSalesOrderForm,
        };
    }, [UIContext]);


    return (
        <Card>
            <CardHeader title="Sales Order List">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        customersUIProps.newSalesOrderForm();
                    }}
                >
                    New Sale
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <HomePageTable />
            </CardBody>
        </Card>
    )
}
