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
    async getAttachFile(data) {
        return ((await this.api.post(`/download-attached-file`, data, {
            responseType: 'arraybuffer'
        }))).data;
    }
    async getCT04(id, data) {
        return ((await this.api.post(`/ct04?generalProfileId=${id}&type=true`, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/msword",
            },
            responseType: 'arraybuffer'
        }))).data;
    }
    async getCT05(id, data) {
        return ((await this.api.post(`/ct05?generalProfileId=${id}&type=true`, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/msword",
            },
            responseType: 'arraybuffer'
        }))).data;
    }
    async getCT06(id, data) {
        return ((await this.api.post(`/ct06?generalProfileId=${id}&type=true`, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/msword",
            },
            responseType: 'arraybuffer'
        }))).data;
    }
}

export default new ReportService;