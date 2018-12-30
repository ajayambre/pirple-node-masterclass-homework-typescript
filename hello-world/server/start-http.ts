import * as http from 'http';
import { envConfig } from '../../config';
import { server } from '.';

export function startHttpServer() {
    const httpServer = http.createServer((request, response) => {
        server(request, response);
    });

    httpServer.listen(envConfig.httpPort, () => {
        console.log('HTTP Server is listening on port ' + envConfig.httpPort + ' in ' + envConfig.envName + ' mode.');
    });
}
