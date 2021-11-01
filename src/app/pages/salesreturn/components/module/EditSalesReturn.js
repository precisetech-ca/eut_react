import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { Table } from '../TableData';
import { useUIContext } from "../../context/UIContext";
import { SalesReturnForm } from '../forms/SalesReturnForm';
import { AuditLogTable} from '../tables/AuditLogTable';

export const EditSalesReturn = ({id}) => {
    const UIContext = useUIContext();
    const [key, setKey] = useState('order');

    return (
      <Card>
        <CardHeader title="Sales Order"></CardHeader>
        <CardBody>
          <SalesReturnForm backToHome={UIContext.backToHome} context={UIContext} />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3 purchase_order_tabs"
          >
            {UIContext.salesreturnTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table /> : <AuditLogTable />}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
