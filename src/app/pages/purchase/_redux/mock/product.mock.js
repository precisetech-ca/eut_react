export const data = [
    {
        sku: [
            {id: "AKC-132123", value: "AKC-132123"},
            {id: "AKUC-4121", value: "AKUC-4121"},
        ],
        barcode: "41231312",
        desc: "Lorem ipsum",
        lot_no: "ALU-55121",
        expiry: "2021-10-02",
        oh_qty: 300,
        available_qty: 150,
        odr_qty: 20,
        uom: "Each",
        cost: 12.99,
        tax: [
            {id: 1, title: "13%"}
        ],
        last_cost: 12.99,
        sub_total: "$1,299.00"
    }
]

  
export const purchaseData = [{
    sku: "AKC-132123",
    barcode: "41231312",
    desc: "Lorem ipsum",
    lot_no: "ALU-55121",
    expiry: "2021-10-02",
    po_finalized_date: "2021-10-02",
    oh_qty: 300,
    supplier: "Walmart",
    available_qty: 150,
    odr_qty: 20,
    uom: "Each",
    notes: "Very good quality products",
    cost: 12.99,
    tax: "13%",
    last_cost: 12.99,
    sub_total: "$1,299.00",
    void: false
}];