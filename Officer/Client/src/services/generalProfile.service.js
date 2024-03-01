import createApiClient from "./api.service";

class GeneralProfileService {
    constructor(baseUrl = "/api/general-profile") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get(`/list`)).data;
    }

    async getByTypeAndCode(type, code) {
        return (await this.api.get(`/by-type-and-ward-code?type=${type}&code=${code}`)).data;
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

    async accepted(id, data) {
        return (await this.api.post(`/accepted?id=${id}`, data)).data;
    }
    async additional(id, data) {
        return (await this.api.post(`/additional?id=${id}`, data)).data;
    }
    async denied(id, data) {
        return (await this.api.post(`/denied?id=${id}`, data)).data;
    }
    async acceptedExtension(id) {
        return (await this.api.post(`/extension/accepted?id=${id}`)).data;
    }
    async deniedExtension(id, data) {
        return (await this.api.post(`/extension/denied?id=${id}`, data)).data;
    }
    async acceptedDelete(id) {
        return (await this.api.post(`/delete-register/accepted?id=${id}`)).data;
    }
    async deniedDelete(id, data) {
        return (await this.api.post(`/delete-register/denied?id=${id}`, data)).data;
    }
}

export default new GeneralProfileService;