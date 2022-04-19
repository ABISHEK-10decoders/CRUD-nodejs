export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('users'));
    if (user && user.token) {
        return {
            "headertoken": user.token

        }
    } else {
        return {};
    }
}