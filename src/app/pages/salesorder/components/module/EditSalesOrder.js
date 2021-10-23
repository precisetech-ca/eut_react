import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab , Button , Col} from "react-bootstrap";
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
    const tabButtonsStyle = {
      width : "15%" ,
      position: "absolute",
      left :  "84.4%",
      top  :  '62.5%',
  }
    return (
      <Card>
        <CardHeader title="Sales Order"></CardHeader>
        <CardBody>
          <SalesOrderForm backToHome={UIContext.backToHome} />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
          >
            {UIContext.slaesorderTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              <Col  style={tabButtonsStyle}>
                <Button variant="outline-success">Split Order</Button>{'   '}
                <Button variant="outline-dark">Create PO</Button>{' '}
              </Col>
              {key === "order" ? <Table /> : <FullfilmentTable />}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
