import { IncomingHttpHeaders } from 'http';
import { ParsedUrlQuery } from 'querystring';

export interface RequestObject {
    trimmedPath: string;
    method: string;
    headers: IncomingHttpHeaders,
    queryStringObject: ParsedUrlQuery,
    payload: string
};

export interface RequestCallbackFn {
    (statusCode?: number, data?: any): void;
}

export interface RequestHandlerFn {
    (request: RequestObject, callback: RequestCallbackFn): void;
}