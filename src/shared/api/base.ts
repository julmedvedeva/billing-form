export class ApiService {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<T> {
    return this._request<T>('GET', endpoint)
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    return this._request<TResponse>('POST', endpoint, data)
  }

  private async _request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        throw new Error(this._getErrorMessage(response.status))
      }

      return (await response.json()) as T
    } catch (error: any) {
      console.error(`Ошибка при ${method}-запросе:`, error.message)
      throw error
    }
  }

  private _getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Некорректный запрос (400)'
      case 401:
        return 'Не авторизован (401)'
      case 403:
        return 'Доступ запрещён (403)'
      case 404:
        return 'Ресурс не найден (404)'
      case 500:
        return 'Ошибка сервера (500)'
      case 503:
        return 'Сервер временно недоступен (503)'
      default:
        return `Неизвестная ошибка (${status})`
    }
  }
}
