import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import * as actions from "../_redux/actions";
import { Table } from './TableData';
import { useUIContext } from "../context/UIContext";
import { PurchaseOrderForm } from './forms/PurchaseOrderForm';
import { AuditLogTable } from './tables/AuditLogTable';


export const NewPurchaseOrder = ({id}) => {
    const UIContext = useUIContext();
    const dispatch = useDispatch();
    const [key, setKey] = useState('order');

    useEffect(() => {
      // server call for getting Customer by id
      dispatch(actions.fetchCustomer(id));
    }, [id, dispatch]);

    return (
      <Card>
        <CardHeader title="Purchase List"></CardHeader>
        <CardBody>
          <PurchaseOrderForm backToHome={UIContext.backToHome}/>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
          >
            {UIContext.inventoryTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table /> : <AuditLogTable />}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
