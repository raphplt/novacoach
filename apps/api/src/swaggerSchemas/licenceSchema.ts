export const licenceSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "The auto-generated id of the licence",
        },
        name: {
            type: "string",
            description: "The name of the licence",
        },
        startDate: {
            type: "string",
            format: "date-time",
            description: "The start date of the licence",
        },
        endDate: {
            type: "string",
            format: "date-time",
            description: "The end date of the licence",
        },
        isActive: {
            type: "boolean",
            description: "Indicates whether the licence is currently active",
        },
        price: {
            type: "number",
            description: "The price of the licence",
            nullable: true,
        },
        createDate: {
            type: "string",
            format: "date-time",
            description: "The creation date of the licence",
        },
        updateDate: {
            type: "string",
            format: "date-time",
            description: "The last update date of the licence",
        },
    },
    required: ["name", "startDate", "endDate", "isActive"],
};
