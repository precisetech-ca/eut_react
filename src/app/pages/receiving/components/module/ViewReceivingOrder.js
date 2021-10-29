import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { Table } from 'app/pages/receiving/components/TableData';
import { useUIContext } from "../../context/UIContext";
import { ReceivingOrderForm } from 'app/pages/receiving/components/forms/ReceivingOrderForm';
import { AuditLogTable } from 'app/pages/receiving/components/tables/AuditLogTable';

export const ViewReceivingOrder = ({id}) => {
    const UIContext = useUIContext();
    const [key, setKey] = useState('order');

    return (
      <Card>
        <CardHeader title="View Receiving List"></CardHeader>
        <CardBody>
          <ReceivingOrderForm 
            backToHome={UIContext.backToHome} 
            isViewable={true} 
            context={UIContext}
          />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
          >
            {UIContext.receivingTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table isViewable={true} /> : <AuditLogTable />}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
