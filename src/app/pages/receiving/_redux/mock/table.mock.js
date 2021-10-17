export const data = [
    {
        sku: "AKU-451431",
        barcode: "41231312",
        description: "Lorem ipsum",
        lot_no: "ALU-55121",
        expiry: "2021-10-02",
        oh_qty: 300,
        available_qty: 150,
        odr_qty: 20,
        uom: [
            {id: 1, title: "each"},
            {id: 1, title: "box"}
        ],
        cost: 12.99,
        rem_cost: "0.00",
        rec_qty: 1,
        tax: [
            {id: 1, title: "13%"}
        ],
        last_cost: 12.99,
        sub_total: "12.99"
    }
]

export const auditLogData = [
    {
        date_time: "2021-03-20",
        message: "Hello",
        user: "Salman"
    }
]; 
  
export const receivingData = [{
    id: 1,
    receiving_no: "REC000186",
    receiving_date: "2021-10-08T14:01:49+05:00",
    supplier: "Po supplier",
    supplier_invoice: "23123",
    complete: "LOBLAW - Loblaws Shed",
    po_number: "PO000118",
    completed_date: "",
    rfp_date: "",
    void: false,
}];