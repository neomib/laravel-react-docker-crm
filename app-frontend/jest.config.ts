export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            { tsconfig: "tsconfig.test.json" }
        ],
    }
};