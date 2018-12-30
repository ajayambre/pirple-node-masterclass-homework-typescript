import { RequestObject, RequestCallbackFn } from '../../models';
import { HTTP_STATUS } from '../../constants/http-status';

export const notFound = (request: RequestObject, callback: RequestCallbackFn) => {
    callback(HTTP_STATUS.NOT_FOUND);
}