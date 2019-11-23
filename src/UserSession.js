class UserSession {
    static getLoggedUser() {
        throw new Error("UserSession.getLoggedUser() should not be called in an unit test");
    }

}

module.exports = UserSession;