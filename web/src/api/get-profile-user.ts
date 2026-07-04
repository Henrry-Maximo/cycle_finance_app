import { api } from '@/lib/axios';

export interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  terms_accepted_at: Date;
  terms_version: string;
}

export async function getProfileUser() {
  const response = await api.get<GetProfileResponse>('/me');

  return response.data;
}
