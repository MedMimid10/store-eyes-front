import * as SecureStore from 'expo-secure-store';

const KEYCLOAK_URL = `http://49.13.89.74:8080/realms/morocco-view/protocol/openid-connect/token`;

export async function login(username: string, password: string) {
    const form = new URLSearchParams({
        username,
        password,
        grant_type:  'password',
        client_id:   'marv-backend',
    });
    const res = await fetch(KEYCLOAK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    form.toString(),
    });
    if (!res.ok) throw new Error(`Login failed ${res.status}`);
    const data = await res.json();
    // Sauvegarde
    const expiry = Date.now() + data.expires_in * 1000;
    await Promise.all([
        SecureStore.setItemAsync('access_token',  data.access_token),
        SecureStore.setItemAsync('refresh_token', data.refresh_token),
        SecureStore.setItemAsync('token_expiry',  expiry.toString()),
    ]);
    return data;
}

export async function logout() {
    await Promise.all([
        SecureStore.deleteItemAsync('access_token'),
        SecureStore.deleteItemAsync('refresh_token'),
        SecureStore.deleteItemAsync('token_expiry'),
    ]);
}
