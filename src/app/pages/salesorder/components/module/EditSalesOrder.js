import React, { useState} from 'react'
import { Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { Table } from '../TableData';
import { useUIContext } from "../../context/UIContext";
import { SalesOrderForm } from '../forms/SalesOrderForm';
import { FullfilmentTable } from '../tables/FullfilmentTable';

export const EditSalesOrder = ({id}) => {
    const UIContext = useUIContext();
    const [key, setKey] = useState('order');

    return (
      <Card>
        <CardHeader title="Sales Order"></CardHeader>
        <CardBody>
          <SalesOrderForm backToHome={UIContext.backToHome} />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3 purchase_order_tabs"
          >
            {UIContext.slaesorderTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table /> : <FullfilmentTable />}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
