import { api } from '@/lib/axios';

import { RequestPasswordError } from './errors/request-password-error';
import { RequestPasswordFetchError } from './errors/request-password-fetch-error';

interface RequestPassword {
  email: string;
}

export async function requestPassword({ email }: RequestPassword) {
  try {
    const response = await api.post('/reset-password/request', {
      email,
    });

    if (response.status !== 200) {
      throw new RequestPasswordError();
    }

    return {
      message: 'Link de renovação enviado com sucesso!',
      response,
    };
  } catch {
    throw new RequestPasswordFetchError();
  }
}
