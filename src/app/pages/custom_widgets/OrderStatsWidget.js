import React from 'react'
import { Progress } from 'reactstrap';

export default function OrderStatsWidget({
    bgClass,
    containerClass,
    saleOrderPercentage,
    saleOrderMin,
    saleOrderMax,
    saleOrderTitle
}) {
    return (
        <div className={`order-stats__wrapper ${bgClass}`}>
            <div className={containerClass}>
              <h3>Pending Pick Orders</h3>
              <div className="order-stats-wrapper__info">
                <span>{saleOrderPercentage}%</span> 
                <p>{saleOrderMin}/{saleOrderMax} {saleOrderTitle}</p>
              </div>
              <div className="general-progress-bar">
                <Progress value={saleOrderPercentage} />
              </div>
            </div>
        </div>
    )
}

OrderStatsWidget.defaultProps = {
    saleOrderPercentage: "46.6",
    saleOrderMin: "6,190",
    saleOrderMax: "11,320",
    saleOrderTitle: "Sales Orders",
    bgClass: "light-pink-container__bg",
    containerClass: "order-stats-pink__container",
}
