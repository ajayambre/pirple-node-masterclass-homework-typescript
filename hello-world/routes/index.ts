import { notFound } from './not-found';
import { ping } from './ping';
import { hello } from './hello';

export const routes = {
    'hello': hello,
    'ping': ping,
    'notFound': notFound
}