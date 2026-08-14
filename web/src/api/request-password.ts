import { api } from '@/lib/axios';

import { RequestPasswordError } from './errors/request-password-error';
import { RequestPasswordFetchError } from './errors/request-password-fetch-error';

interface RequestPassword {
  email: string;
}

interface RequestPasswordResponse {
  url: string;
}

export async function requestPassword({
  email,
}: RequestPassword): Promise<RequestPasswordResponse> {
  try {
    const { data, status } = await api.post<{ url: string }>(
      '/reset-password/request',
      {
        email,
      },
    );

    if (status !== 200) {
      throw new RequestPasswordError();
    }

    return { url: data.url };
  } catch {
    throw new RequestPasswordFetchError();
  }
}
