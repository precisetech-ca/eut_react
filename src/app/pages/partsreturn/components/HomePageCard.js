import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from "_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { usePartsReturnUIContext } from "../context/PartsReturnUIContext";
import { HomePageTable } from './HomePageTable';

export const HomePageCard = () => {
    const PartsReturnUIContext = usePartsReturnUIContext();
    const dispatch = useDispatch();
    const customersUIProps = useMemo(() => {
        return {
            ids: PartsReturnUIContext.ids,
            newPartsReturnForm: PartsReturnUIContext.newPartsReturnForm,
        };
    }, [PartsReturnUIContext]);


    return (
        <Card>
            <CardHeader title="Parts Return List">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        customersUIProps.newPartsReturnForm();
                    }}
                >
                    New Part Return
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <HomePageTable />
            </CardBody>
        </Card>
    )
}
