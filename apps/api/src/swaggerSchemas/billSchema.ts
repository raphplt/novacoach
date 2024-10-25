export const billSchema = {
    type: "object",
    properties: {
        idBill: {
            type: "integer",
            description: "The auto-generated id of the bill",
        },
        issueDate: {
            type: "string",
            format: "date-time",
            description: "The issue date of the bill",
        },
        paymentDate: {
            type: "string",
            format: "date-time",
            description: "The payment date of the bill",
        },
        price: {
            type: "number",
            description: "The price of the bill",
        },
        createDate: {
            type: "string",
            format: "date-time",
            description: "The creation date of the bill",
        },
        updateDate: {
            type: "string",
            format: "date-time",
            description: "The last update date of the bill",
        },
    },
};
