import * as http from 'http';
import { StringDecoder } from 'string_decoder';
import * as url from 'url';
import { REGEX_REPLACE_SLASHES } from '../../constants';
import { HTTP_STATUS } from '../../constants/http-status';
import { RequestHandlerFn, RequestObject } from '../../models';
import { routes } from '../routes';

export const server = (request: http.IncomingMessage, response: http.ServerResponse) => {
    let decoder = new StringDecoder();
    let buffer = '';

    request.on('data', (chunk) => {
        buffer += decoder.write(chunk);
    });

    request.on('end', () => {
        buffer += decoder.end();

        let requestObject = getRequestObject(request, buffer);
        let requestHandler = getRequestHandler(requestObject);

        requestHandler(requestObject,  (statusCode?: number, data?: any) => {
            response.setHeader('content-type', 'application/json');
            response.writeHead(getResponseStatus(statusCode));
            response.end(getResponseJson(data));
        });
    });
}

function getRequestObject(request: http.IncomingMessage, buffer: string): RequestObject {
    let parsedUrl = url.parse(request.url, true);
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(REGEX_REPLACE_SLASHES, '');

    let requestObject: RequestObject = {
        trimmedPath: trimmedPath,
        method: request.method.toUpperCase(),
        headers: request.headers,
        queryStringObject: parsedUrl.query,
        payload: buffer
    };

    return requestObject;
}

function getRequestHandler(requestObject: RequestObject): RequestHandlerFn {
    return typeof (routes[requestObject.trimmedPath]) !== 'undefined' ? routes[requestObject.trimmedPath] : routes.notFound;
}

function getResponseStatus(statusCode: number) {
    return typeof (statusCode) !== 'undefined' ? statusCode : HTTP_STATUS.OK;
}

function getResponseJson(data) {
    let result = typeof (data) !== 'undefined' ? data : {};
    return JSON.stringify(result);
}