import React from 'react'
import DeleteIcon from "@material-ui/icons/Delete";

export default function NotificationWidget({title, subTitle, count, bg}) {
    return (
        <div className="notification-badge-wrapper mt-2 mb-2">
            <div className={`notification-badge__container ${bg}`}>
                <div className="notification-badge__icon ">
                <span className="d-flex justify-content-center">
                    <DeleteIcon />
                </span>
                <div className="notification-badge-icon__title d-flex justify-content-center">
                    {title}
                </div>
                </div>
                <span className="d-flex justify-content-center">{subTitle}</span>
            </div>
            <div className="notification-badge-wrapper__count">
                {count}
            </div>
        </div>
    )
}

NotificationWidget.defaultProps = {
    title: "NC36",
    subTitle: "25 - 36 months",
    count: 7689,
    bg: "light-green__bg"
}
