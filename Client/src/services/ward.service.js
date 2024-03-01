import createApiClient from "./api.service";

class WardService {
    constructor(baseUrl = "/api/ward") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/list")).data;
    }

    async getByDistrictCode(districtCode) {
        return (await this.api.get(`/by-district-code?districtCode=${districtCode}`)).data;
    }
    async getByCode(code) {
        return (await this.api.get(`/info?code=${code}`)).data;
    }
    async getByFullName(fullName) {
        return (await this.api.get(`/by-full-name?fullName=${fullName}`)).data;
    }

    async getByFullName(fullName, districtCode) {
        return (await this.api.get(`/by-full-name?fullName=${fullName}&districtCode=${districtCode}`)).data;
    }
}

export default new WardService;