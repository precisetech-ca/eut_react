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
            newPurchaseForm: UIContext.newPurchaseForm,
        };
    }, [UIContext]);


    return (
        <Card>
            <CardHeader title="Purchase List">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        customersUIProps.newPurchaseForm();
                        UIContext.setTempData({});
                    }}
                >
                    New PO
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <HomePageTable />
            </CardBody>
        </Card>
    )
}
