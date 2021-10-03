import React from 'react'
import {Row, Col} from 'reactstrap'

export const Summary = ({price, taxes}) => {
    const total = Number(price) + Number(taxes);
    return (
        <div className="summary">
            <Row>
                <Col>
                    <h5>Amount: </h5>
                </Col>
                <Col>
                    <span>${price}</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Taxes: </h5>
                </Col>
                <Col>
                    <span>${taxes}</span>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <h5>Total: </h5>
                </Col>
                <Col>
                    <span>${total.toFixed(2)}</span>
                </Col>
            </Row>
            <hr />
        </div>
    )
}

Summary.defaultProps = {
    price: "6735.60",
    taxes: "1010.34"
}