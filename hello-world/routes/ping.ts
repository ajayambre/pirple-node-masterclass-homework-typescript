import { RequestObject, RequestCallbackFn } from '../../models';
import { HTTP_STATUS } from '../../constants/http-status';

export const ping = (request: RequestObject, callback: RequestCallbackFn) => {
    callback(HTTP_STATUS.OK);
}