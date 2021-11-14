import React, { useMemo, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { usePurchaseGroupUIContext } from "../context/PurchaseGroupUIContext";
import { PurchaseGroupForm } from "./forms/PurchaseGroupForm";

export const HomePageCard = () => {
  const PurchaseGroupUIContext = usePurchaseGroupUIContext();
  const dispatch = useDispatch();
  const customersUIProps = useMemo(() => {
    return {
      ids: PurchaseGroupUIContext.ids,
      newPartsReturnForm: PurchaseGroupUIContext.newPartsReturnForm,
    };
  }, [PurchaseGroupUIContext]);

  return (
    <Card>
      <CardHeader title="Purchase Group List">
        <CardHeaderToolbar></CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PurchaseGroupForm />
      </CardBody>
    </Card>
  );
};
