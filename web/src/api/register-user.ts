import { api } from "@/lib/axios";

export interface RegisterUserBody {
  username: string,
  email: string,
  password: string,
}

export async function registerUser({ username, email, password }: RegisterUserBody) {
  try {
    const response = await api.post('/users', { username, email, password });

    if (response.status !== 201) {
      throw new Error("Não foi possível cadastrar o usuário.");
    };

    return { message: "Usuário cadastrado com sucesso!" }
  } catch {
    throw new Error("Houve um problema no conexão de cadastro.")
  }
}