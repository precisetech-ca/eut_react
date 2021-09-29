import React, {useMemo} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "_metronic/_partials/controls";
import { Filter } from "../filters/Filter";
import { Grouping } from "../grouping/Grouping";
import { Table } from './TableData';
import { useUIContext } from "../context/UIContext";


export const TableCard = () => {
    const UIContext = useUIContext();
    const customersUIProps = useMemo(() => {
        return {
            ids: UIContext.ids,
            newCustomerButtonClick: UIContext.newCustomerButtonClick,
        };
    }, [UIContext]);


    return (
        <Card>
            <CardHeader title="Purchase List">
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
                <Filter />
                {customersUIProps?.ids?.length > 0 && <Grouping />}
                <Table />
            </CardBody>
            </Card>
    )
}
