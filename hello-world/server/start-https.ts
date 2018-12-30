import * as fs from 'fs';
import * as https from 'https';
import { envConfig } from '../../config';
import { server } from '.';

export function startHttpsServer() {
    const httpsOptions = {
        key: fs.readFileSync(envConfig.httpsKeyFilePath),
        cert: fs.readFileSync(envConfig.httpsCertFilePath)
    };
    const httpsServer = https.createServer(httpsOptions, (request, response) => {
        server(request, response);
    });

    httpsServer.listen(envConfig.httpsPort, () => {
        console.log('HTTPS Server is listening on port ' + envConfig.httpsPort + ' in ' + envConfig.envName + ' mode.');
    });
}
