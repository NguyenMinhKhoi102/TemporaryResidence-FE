import createApiClient from "./api.service"

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }
    async signup(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signOut() {
        return (await this.api.post("/signin")).data;
    }
}

export default new AuthService;