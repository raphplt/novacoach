export const nutritionProgramSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "The auto-generated id of the nutrition program",
        },
        name: {
            type: "string",
            description: "The name of the nutrition program",
        },
        duration: {
            type: "number",
            description: "The duration of the nutrition program",
            nullable: true,
        },
        frequency: {
            type: "number",
            description: "The frequency of the nutrition program per week",
        },
        idStructure: {
            type: "number",
            description: "The id of the structure associated with the program",
        },
    },
};
