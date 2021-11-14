import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab , Button , Col} from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { Table } from '../TableData';
import { usePurchaseGroupUIContext } from "../../context/PurchaseGroupUIContext";
import { PurchaseGroupForm } from '../forms/PurchaseGroupForm';

export const EditPurchaseGroup = ({id}) => {
    const PurchaseGroupUIContext = usePurchaseGroupUIContext();
    const [key, setKey] = useState('order');
   
    return (
      <Card>
        <CardHeader title="Purchase Group"></CardHeader>
        <CardBody>
          <PurchaseGroupForm backToHome={PurchaseGroupUIContext.backToHome}  context={PurchaseGroupUIContext}/>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3 purchase_order_tabs"
          >
            {PurchaseGroupUIContext.partsreturnTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table /> : null
              }
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
