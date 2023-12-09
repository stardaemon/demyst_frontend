interface ApiConfig {
    baseUrl: string;
}

export const getConfig = (): ApiConfig => {
    const environment = process.env.REACT_APP_ENV || 'dev';
    const configFileName = `${environment}.config.json`;
  
    const config = require(`./config/${configFileName}`);
    return config as ApiConfig;
};