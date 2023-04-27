import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../../env/enviroment';
import _ from "lodash";


export class HTTP {
    protected defaultConfig: AxiosRequestConfig;

    public constructor(protected readonly axiosConfig?: AxiosRequestConfig) {
        this.defaultConfig = {
            baseURL: environment.API_URL,
            headers: {
                "Authorization" : `OAuth oauth_consumer_key="${environment.TRELLO_API_KEY}", oauth_token="${environment.TRELLO_OAUTH_TOKEN}"`,
                "Content-Type" : "application/json"
            },
            ...axiosConfig
        }
    }

    protected async get(url: string, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, url, method: "GET"});
    }

    protected async post(url: string, data: object, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, data, url, method: "POST"});
    }

    protected async patch(url: string, data: object, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, data, url, method: "PATCH"}); 
    }

    protected async put(url: string, data: object, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, data, url, method: "PUT"}); 
    }

    protected async delete(url: string, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, url, method: "DELETE"});
    }

    private async apiProcessor(config: AxiosRequestConfig) {
        const axiosConfig: AxiosRequestConfig = _.merge({}, this.defaultConfig, config);
        try {
            const instance = axios.create();
            return instance.request(axiosConfig);
        } catch (error: any) {
            return error.response ? error.response : error;
        }
    }    
 
}