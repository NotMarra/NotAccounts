import PocketBase from 'pocketbase';

export const pb = new PocketBase("https://base.notmarra.com");

export function checkLogin() {
  if (!pb.authStore.isValid) {
    pb.authStore.clear();
    return false;
  }
  return true;
}

export function logout() {
  pb.authStore.clear();
  window.location.href = '/login';
}