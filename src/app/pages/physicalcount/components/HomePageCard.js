import React, {useMemo} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from "_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { usePhysicalCountUIContext } from "../context/PhysicalCountUIContext";
import { HomePageTable } from './HomePageTable';

export const HomePageCard = () => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();
    const dispatch = useDispatch();
    const customersUIProps = useMemo(() => {
        return {
            ids: PhysicalCountUIContext.ids,
            newPhysicalCountForm: PhysicalCountUIContext.newPhysicalCountForm,
        };
    }, [PhysicalCountUIContext]);


    return (
        <Card>
            <CardHeader title="Physical Count List">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        customersUIProps.newPhysicalCountForm();
                    }}
                >
                    New Physical Count 
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <HomePageTable />
            </CardBody>
        </Card>
    )
}
