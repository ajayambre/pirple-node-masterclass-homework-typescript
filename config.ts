export interface EnvironmentOptions  {
    httpPort: number;
    httpsPort: number;
    httpsKeyFilePath: string;
    httpsCertFilePath: string;
    envName: string;
}

export interface Environments {
    staging : EnvironmentOptions,
    production: EnvironmentOptions
}

const environments: Environments = {
    staging: {
        httpPort: 3000,
        httpsPort: 3001,
        httpsKeyFilePath: '.\\https\\key.pem',
        httpsCertFilePath: '.\\https\\cert.pem',
        envName: 'staging'
    },
    production: {
        httpPort: 5000,
        httpsPort: 5001,
        httpsKeyFilePath: '.\\https\\key.pem',
        httpsCertFilePath: '.\\https\\cert.pem',
        envName: 'production'
    }
};

let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

export const envConfig: EnvironmentOptions = typeof(environments[currentEnvironment]) !== 'undefined' ? environments[currentEnvironment] : environments.staging;



