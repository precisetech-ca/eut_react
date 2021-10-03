import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from "_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import * as actions from "../_redux/actions";
import { Table } from './TableData';
import { Filter } from "../filters/Filter";
import { useUIContext } from "../context/UIContext";
import { Grouping } from "../grouping/Grouping";

export const HomePageCard = () => {
    const UIContext = useUIContext();
    const dispatch = useDispatch();
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
                    }}
                >
                    New PO
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
