class ApiResponse {
    constructor(statusCode, message="success", data) {
        this.statusCode = statusCode;
        this.success = true;
        this.message = message;
        this.data = data;
        this.success= statusCode < 400
    }
}

export {ApiResponse}