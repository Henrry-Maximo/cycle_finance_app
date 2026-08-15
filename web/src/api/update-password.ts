import { api } from '@/lib/axios';

interface UpdatePassword {
  password: string;
  token: string;
}

export async function updatePassword({
  password,
  token,
}: UpdatePassword): Promise<void> {
  try {
    const { status } = await api.post(`/reset-password?token=${token}`, {
      password,
    });

    if (status == 401) {
      throw new Error('Token inválido.');
    }

    return;
  } catch {
    throw new Error('');
  }
}
