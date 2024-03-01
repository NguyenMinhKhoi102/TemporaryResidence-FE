import createApiClient from "./api.service";

class DistrictService {
    constructor(baseUrl = "/api/district") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/list")).data;
    }

    async getByProvinceCode(provinceCode) {
        return (await this.api.get(`/by-province-code?provinceCode=${provinceCode}`)).data;
    }

    async getByFullName(fullName, provinceCode) {
        return (await this.api.get(`/by-full-name?fullName=${fullName}&provinceCode=${provinceCode}`)).data;
    }
}

export default new DistrictService;