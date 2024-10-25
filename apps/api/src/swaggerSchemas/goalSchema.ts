export const goalSchema = {
    type: "object",
    properties: {
        idGoal: {
            type: "integer",
            description: "The auto-generated id of the goal",
        },
        name: {
            type: "string",
            description: "The name of the goal",
        },
        description: {
            type: "string",
            description: "The description of the goal",
        },
        value: {
            type: "number",
            description: "The value of the goal",
        },
        startDate: {
            type: "string",
            format: "date-time",
            description: "The start date of the goal",
        },
        endDate: {
            type: "string",
            format: "date-time",
            description: "The end date of the goal",
        },
        idUserDetails: {
            type: "integer",
            description: "The user details id associated with the goal",
        },
        createDate: {
            type: "string",
            format: "date-time",
            description: "The creation date of the goal",
        },
        updateDate: {
            type: "string",
            format: "date-time",
            description: "The last update date of the goal",
        },
    },
};
