export class CustomError extends Error {
    responseJson;
    constructor(message, responseJson) {
        super(message);
        this.responseJson = responseJson;
    }
}
