import createApiClient from "./api.service";

class ReceiveResultService {
    constructor(baseUrl = "/api/receive-result") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(active) {
        return (await this.api.get(`/list?active=${active}`)).data;
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

export default new ReceiveResultService;