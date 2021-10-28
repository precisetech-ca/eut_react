import React, {useMemo, useEffect, useState} from 'react'
import { Tabs, Tab , Button , Col} from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
} from "_metronic/_partials/controls";
import { Table } from '../TableData';
import { usePartsReturnUIContext } from "../../context/PartsReturnUIContext";
import { PartsReturnForm } from '../forms/PartsReturnForm';
import { FullfilmentTable } from '../tables/FullfilmentTable';

export const EditPartsReturn = ({id}) => {
    const PartsReturnUIContext = usePartsReturnUIContext();
    const [key, setKey] = useState('order');
   
    return (
      <Card>
        <CardHeader title="Parts Return"></CardHeader>
        <CardBody>
          <PartsReturnForm backToHome={PartsReturnUIContext.backToHome} />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
          >
            {PartsReturnUIContext.partsreturnTabs.map(({key, title}) => 
            <Tab eventKey={key} title={title} className="mt-2 ml-1">
              {key === "order" ? <Table /> : <FullfilmentTable />}
            </Tab>)}
          </Tabs>
        </CardBody>
      </Card>
    )
}
