import createApiClient from "./api.service";

class TypeNotificationService {
    constructor(baseUrl = "/api/type-notification") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(active) {
        return (await this.api.get(`/list?active=${active}`)).data;
    }

    async getById(id) {
        return (await this.api.get(`/info?id=${id}`)).data;
    }
}

export default new TypeNotificationService;