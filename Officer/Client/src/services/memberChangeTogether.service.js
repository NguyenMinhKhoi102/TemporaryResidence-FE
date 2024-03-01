import createApiClient from "./api.service";

class MemberChangeTogetherService {
    constructor(baseUrl = "/api/member-change-together") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get(`/list`)).data;
    }

    async getAllByGeneralProfileId(id) {
        return (await this.api.get(`/by-general-profile-id?id=${id}`)).data;
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

export default new MemberChangeTogetherService;