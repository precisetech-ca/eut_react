import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab,Button , Col} from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,

} from "_metronic/_partials/controls";
import { Table } from '../TableData';
import { usePhysicalCountUIContext } from "../../context/PhysicalCountUIContext";
import { PhysicalCountForm } from '../forms/PhysicalCountForm';
import { FullfilmentTable } from '../tables/FullfilmentTable';

export const NewPhysicalCount = ({id}) => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();
    const [key, setKey] = useState('order');

    return (
      <Card>
        <CardHeader title="Physical Count Infromation"></CardHeader>
        <CardBody>
          <PhysicalCountForm backToHome={PhysicalCountUIContext.backToHome}/> 
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3 purchase_order_tabs"
          >
           {
            PhysicalCountUIContext.physicalcountTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              { key === "order" ? <Table /> : <FullfilmentTable /> }
            </Tab>)} 
          </Tabs>
        </CardBody>
      </Card>
    )
}
