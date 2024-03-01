import createApiClient from "./api.service";

class AccountService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get(`/list`)).data;
    }
}

export default new AccountService;