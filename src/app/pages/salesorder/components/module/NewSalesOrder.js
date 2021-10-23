import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab,Button , Col} from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,

} from "_metronic/_partials/controls";
import { Table } from '../TableData';
import { useUIContext } from "../../context/UIContext";
import { SalesOrderForm } from '../forms/SalesOrderForm';
import { FullfilmentTable } from '../tables/FullfilmentTable';

export const NewSalesOrder = ({id}) => {
    const UIContext = useUIContext();
    const [key, setKey] = useState('order');
    const tabButtonsStyle = {
        width : "15%" ,
        position: "absolute",
        left :  "84.4%",
        top  :  '62.5%',
        borderRadius:'0 !important'
    }
    return (
      <Card>
        <CardHeader title="Sales Order Infromation"></CardHeader>
        <CardBody>
          <SalesOrderForm backToHome={UIContext.backToHome}/> 
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3 purchase_order_tabs"
          >
           {
             UIContext.salesorderTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {
                key === "order" ? 
              <>
                <Col style={tabButtonsStyle}>
                  <Button variant="outline-dark"><u> Split Order </u></Button>{'   '}
                  <Button  variant="outline-success"><u> Create PO </u></Button>{' '}
                </Col>
              <Table /> 
              </> : 
              <FullfilmentTable />
              }
            </Tab>)} 
          </Tabs>
        </CardBody>
      </Card>
    )
}
