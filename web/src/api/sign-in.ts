import { api } from "@/lib/axios";

export interface SignInBody {
  email: string,
  password: string,
}

export interface SignInResponse {
  token: string,
}

export async function signIn({ email, password }: SignInBody): Promise<SignInResponse> {
  try {
    const response = await api.post('/sessions', { email, password });

    if (!response) {
      throw new Error("Token inválido.");
    };

    const { token } = response.data as SignInResponse;

    return { token };
  } catch {
    throw new Error("Houve um problema na requisição de login.")
  }
}