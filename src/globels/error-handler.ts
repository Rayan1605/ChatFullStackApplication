import HTTP_STATUS from 'http-status-codes';

interface IERROR {

    message: string;
    statusCode: number;
    status: string;
    serializeErrors(): IERROR;
}

export  interface IErrorHandler {
    message: string;
    statusCode: number;
    status: string;
    serializeErrors(): IERROR;

}