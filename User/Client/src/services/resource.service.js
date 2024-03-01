import createApiClient from "./api.service";

class ResourceService {
    constructor(baseUrl = "/") {
        this.api = createApiClient(baseUrl);
    }

    async getTemplate(data) {
        return (await this.api.get(`/${data}`)).data;
    }
}

export default new ResourceService;