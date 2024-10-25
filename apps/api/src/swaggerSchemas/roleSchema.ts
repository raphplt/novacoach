export const roleSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "The auto-generated id of the role",
        },
        name: {
            type: "string",
            description: "The name of the role",
        },
        permissions: {
            type: "array",
            items: {
                type: "string",
            },
            description: "List of permissions associated with the role",
        },
        createDate: {
            type: "string",
            format: "date-time",
            description: "The creation date of the role",
        },
        updateDate: {
            type: "string",
            format: "date-time",
            description: "The last update date of the role",
        },
    },
    required: ["name", "permissions"],
};
