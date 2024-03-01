import createApiClient from "./api.service";

class ReportService {
    constructor(baseUrl = "/api/report") {
        this.api = createApiClient(baseUrl);
    }

    async getCT01() {
        return ((await this.api.post(`/sample-ct01`, null, {
            headers: {
                "Content-Type": "application/msword",
                Accept: "application/msword",
            },
            responseType: 'arraybuffer'
        }))).data;
    }
}

export default new ReportService;