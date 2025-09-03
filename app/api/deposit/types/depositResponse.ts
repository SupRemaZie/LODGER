export class depositResponse {
    status: string;
    message: string;
    code?: number;

    constructor(status: string, message: string, code?: number) {
        this.status = status;
        this.message = message;
        this.code = code;
    }
}