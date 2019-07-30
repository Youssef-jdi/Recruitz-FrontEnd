class Auth {
	/**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
	static authenticateUser(token, user) {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));
	}

	/**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
	static isUserAuthenticated() {
		return localStorage.getItem('token') !== null;
	}

	/**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
	static deauthenticateUser() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		console.log('removed');
	}

	static updateUser(user) {
		localStorage.removeItem('user');
		localStorage.setItem('user', JSON.stringify(user));
	}

	/**
     * Get a token value.
     *
     * @returns {string}
     */

	static getToken() {
		return localStorage.getItem('token');
	}

	static getUser() {
		let user = JSON.parse(localStorage.getItem('user'));
		return user;
	}
}

export default Auth;
