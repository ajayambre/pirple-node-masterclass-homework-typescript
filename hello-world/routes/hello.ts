import { RequestObject, RequestCallbackFn } from '../../models';
import { HTTP_STATUS } from '../../constants/http-status';

export const hello = (request: RequestObject, callback: RequestCallbackFn) => {
    callback(HTTP_STATUS.OK, {
        message: 'Hello World'
    });
}