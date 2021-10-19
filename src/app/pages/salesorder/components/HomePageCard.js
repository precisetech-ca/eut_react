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
import { Filter } from "../filters/Filter";
import { useUIContext } from "../context/UIContext";
import { Grouping } from "../grouping/Grouping";
import { HomePageTable } from './HomePageTable';

export const HomePageCard = () => {
    const UIContext = useUIContext();
    const dispatch = useDispatch();
    const customersUIProps = useMemo(() => {
        return {
            ids: UIContext.ids,
            newSalesOrderForm: UIContext.newSalesOrderForm,
        };
    }, [UIContext]);


    return (
        <Card>
            <CardHeader title="Sales Retunr List">
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
