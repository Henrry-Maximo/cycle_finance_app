import { api } from '@/lib/axios';

export interface refreshTokenSessionResponse {
  token: string;
}

export async function refreshTokenSession(): Promise<refreshTokenSessionResponse> {
  try {
    const response = await api.patch('/token/refresh');

    if (!response) {
      throw new Error('Token inválido.');
    }

    const { token } = response.data as refreshTokenSessionResponse;

    return { token };
  } catch {
    throw new Error('Houve um problema na requisição de atualização de token.');
  }
}
