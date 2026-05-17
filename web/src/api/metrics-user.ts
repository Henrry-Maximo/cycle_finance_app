import { api } from "@/lib/axios";

export interface MetricsUserResponse {
  total_expenses_day: number,
  count_expenses_month: number,
  count_expenses_day: number,
  total_expenses_month: number,
}

export async function metricsUser(): Promise<MetricsUserResponse> {
  try {
    const response = await api.get('/metrics');

    if (!response) {
      throw new Error("Token inválido.");
    };

    const { count_expenses_day, count_expenses_month, total_expenses_day, total_expenses_month } = response.data as MetricsUserResponse;

    return { count_expenses_day, count_expenses_month, total_expenses_day, total_expenses_month };
  } catch {
    throw new Error("Houve um problema na obtenção das métricas do usuário.")
  }
}