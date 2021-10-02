import React, {useMemo, useEffect, useState} from 'react'
import { Modal, Tabs, Tab } from "react-bootstrap";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { Filter } from "../filters/Filter";
import { Grouping } from "../grouping/Grouping";
import { Table } from './TableData';
import { useUIContext } from "../context/UIContext";
import { EditForm } from './EditForm';


export const TableCard = ({id}) => {
    const UIContext = useUIContext();
    const dispatch = useDispatch();
    const [key, setKey] = useState('order');
    const customersUIProps = useMemo(() => {
      return {
        ids: UIContext.ids,
        newCustomerButtonClick: UIContext.newCustomerButtonClick,
      };
    }, [UIContext]);

    useEffect(() => {
      // server call for getting Customer by id
      dispatch(actions.fetchCustomer(id));
    }, [id, dispatch]);

    return (
      <Card>
        <CardHeader title="Purchase List"></CardHeader>
        <CardBody>
          <EditForm />
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
