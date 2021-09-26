import React from 'react'
import {
    MixedWidget1,
    AdvanceTablesWidget2,
    AdvanceTablesWidget7,
  } from "../../../_metronic/_partials/widgets";
import NotificationWidget from '../custom_widgets/NotificationWidget';
import OrderStatsWidget from '../custom_widgets/OrderStatsWidget';


export function MainDashboard() {
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-lg-12 col-xxl-8">
          <div className="row">
            <div className="col-sm-6 col-lg-6 col-xxl-3">
              <NotificationWidget />
            </div>
            <div className="col-sm-6 col-lg-6 col-xxl-3">
              <NotificationWidget />
            </div>
            <div className="col-sm-6 col-lg-6 col-xxl-3">
              <NotificationWidget bg="light-purple__bg" count="3968" />
            </div>
            <div className="col-sm-6 col-lg-6 col-xxl-3">
              <NotificationWidget bg="orange__bg" count="503" />
            </div>
          </div>
          <div className="row mt-4 mb-4">
            <div className="col-lg-6 col-xxl-12">
              <AdvanceTablesWidget2 />
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xxl-4">
          <OrderStatsWidget saleOrderPercentage={72.22}/>
          <OrderStatsWidget 
            bgClass="light-green-container__bg" 
            containerClass="order-stats-green__container"
            saleOrderPercentage={45.66}
          />
          <div className="row">
            <div className="col-sm-6 col-lg-6 col-xxl-6">
              <NotificationWidget bg="light-pink__bg" count="3968" />
            </div>
            <div className="col-sm-6 col-lg-6 col-xxl-6">
              <NotificationWidget bg="light-pink__bg" count="3968" />
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-xxl-8  mt-4 mb-4">
          <AdvanceTablesWidget7 />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <MixedWidget1 className="card-stretch gutter-b" />
        </div>
      </div>
    </>
  )
}
