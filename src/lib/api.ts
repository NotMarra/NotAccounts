import { User, Response } from "./object";
import { pb } from "./pb";

// ####################
// Users
// ####################

export async function getUsers(page: number = 1, limit: number = 1): Promise<User[]> {
  const response = await pb.collection('users').getList( page, limit, { sort: '-created' });
  return response.items.map(item => User.fromJSON(item));
}

export async function getUser(id: string): Promise<User> {
  const response = await pb.collection('users').getOne(id);
  return User.fromJSON(response);
}

export async function getUsersCount(): Promise<number> {
  const response = await pb.collection('users').getList(1,1);
  return response.totalItems;
}

export async function getUserAvatar(id: string): Promise<string> {
  const response = await pb.collection('users').getOne(id);
  return response.avatar;
}

export async function uploadUserAvatar(id: string, file: File): Promise<any> {
  const response = await pb.collection('users').update(id, {
    "avatar": new File([file], id, { type: file.type })
  });
  return response;
}

export async function sendVerificationEmail(email: string): Promise<any> {
  await pb.collection('users').requestVerification(email);
}

export async function sendPasswordResetEmail(email: string): Promise<any> {
  await pb.collection('users').requestPasswordReset(email);
}

export async function sendEmailChangeEmail(email: string): Promise<any> {
  await pb.collection('users').requestEmailChange(email);
}

export async function updateUser(id: string, data: any): Promise<any> {
  const response = await pb.collection('users').update(id, data);
  return response;
}

export async function verifyUserEmail(token: string): Promise<boolean> {
  const response = await pb.collection('users').confirmVerification(token);
  return response;
}