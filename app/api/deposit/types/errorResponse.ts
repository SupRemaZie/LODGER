export class errorResponse {
    status: string;
    message: string;
    code: number;

    constructor(message: string, code: number) {
        this.status = 'ERROR';
        this.message = message;
        this.code = code;
    }
}