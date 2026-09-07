import { api } from '@/lib/axios';

import { RequestPasswordError } from './errors/request-password-error';
import { RequestPasswordFetchError } from './errors/request-password-fetch-error';
import axios from 'axios';

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
    const { data } = await api.post<{ url: string }>(
      '/reset-password/request',
      {
        email,
      },
    );

    return { url: data.url };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw new RequestPasswordError();
      }

      if (err.response?.status === 500) {
        throw new RequestPasswordFetchError();
      }
    }

    throw err;
  }
}
