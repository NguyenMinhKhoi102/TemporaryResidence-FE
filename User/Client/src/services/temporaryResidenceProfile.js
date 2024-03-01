import createApiClient from "./api.service";

class TemporaryResidenceProfileService {
    constructor(baseUrl = "/api/temporary-residence-profile") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get(`/list`)).data;
    }
    async getAllByIsExpired(isExpired) {
        return (await this.api.get(`/by-is-expired?isExpired=${isExpired}`)).data;
    }
    async getAllByWardCode(wardCode) {
        return (await this.api.get(`/by-ward-code?wardCode=${wardCode}`)).data;
    }
    async getById(id) {
        return (await this.api.get(`/info?id=${id}`)).data;
    }

    async add(data) {
        return (await this.api.post(`/add`, data)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/update?id=${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/delete?id=${id}`)).data;
    }
}

export default new TemporaryResidenceProfileService;