import createApiClient from "./api.service";

class ProvinceService {
    constructor(baseUrl = "/api/province") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/list")).data;
    }
    async getByFullName(fullName) {
        return (await this.api.get(`/by-full-name?fullName=${fullName}`)).data;
    }
}

export default new ProvinceService;