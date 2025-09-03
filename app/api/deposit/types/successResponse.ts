export class successResponse {
    status: string;
    message: string;
    code: number;

    constructor(message: string, code: number) {
        this.status = 'SUCCESS';
        this.message = message;
        this.code = code;
    }
}