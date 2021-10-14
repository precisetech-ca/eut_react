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


export const EditReceivingOrder = ({id}) => {
    const UIContext = useUIContext();
    const [key, setKey] = useState('order');

    return (
      <Card>
        <CardHeader title="Update Receiving"></CardHeader>
        <CardBody>
          <ReceivingOrderForm backToHome={UIContext.backToHome} />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
          >
            {UIContext.inventoryTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table /> : <h1>{title}</h1>}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
