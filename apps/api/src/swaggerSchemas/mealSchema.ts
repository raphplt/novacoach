export const mealSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "The auto-generated id of the meal",
        },
        mealStarter: {
            type: "string",
            description: "The starter dish that is served before the main meal.",
        },
        mealMainCourse: {
            type: "string",
            description: "The main meal.",
        },
        mainDessert: {
            type: "string",
            description: "the main dessert that is served after the main meal",
        },
        endDate: {
            type: "string",
            format: "date-time",
            description: "The ending date",
        },
        complements: {
            type: "string",
            description: "The complements",
        },
        dayTime: {
            type: "string",
            format: "time",
            description: "The time of the day for the meal",
        },
    },
};
