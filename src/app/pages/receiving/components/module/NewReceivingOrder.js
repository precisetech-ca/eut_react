import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { Table } from 'app/pages/receiving/components/TableData';
import { useUIContext } from "app/pages/receiving/context/UIContext";
import { ReceivingOrderForm } from 'app/pages/receiving/components/forms/ReceivingOrderForm';
import { AuditLogTable } from 'app/pages/receiving/components/tables/AuditLogTable';


export const NewReceivingOrder = ({id}) => {
    const UIContext = useUIContext();
    const [key, setKey] = useState('order');

    return (
      <Card>
        <CardHeader title="New Receiving"></CardHeader>
        <CardBody>
          <ReceivingOrderForm backToHome={UIContext.backToHome}/>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3 purchase_order_tabs"
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
