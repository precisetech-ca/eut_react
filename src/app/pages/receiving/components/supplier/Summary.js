import React from 'react'
import {Row, Col} from 'reactstrap'

export const Summary = ({amount, total, tax_amount, tax_perc}) => {
    return (
        <div className="summary">
            <Row>
                <Col>
                    <h5>Amount: </h5>
                </Col>
                <Col>
                    <span>${amount}</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Tax ({tax_perc}%): </h5>
                </Col>
                <Col>
                    <span>${tax_amount}</span>
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
    amount: '0.00',
    currency_symbol: '$',
    tax_amount: '0.00',
    tax_perc: 13,
    total: 0
}