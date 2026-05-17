import { api } from '@/lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  terms_accepted_at: Date;
  terms_version: string;
}

export interface GetProfileResponse {
  user: User;
};

export async function getProfileUser() {
  const response = await api.get<GetProfileResponse>('/me');

  return response.data;
};
