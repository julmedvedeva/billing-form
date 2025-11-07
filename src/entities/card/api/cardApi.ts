import { ApiService } from '@/shared/api/base'
import type { CartData } from '@/entities/card/model/types'

// Базовый URL API
const BASE_URL = 'https://667040eb0900b5f87249f3b2.mockapi.io'

export class CardApiService {
  private api: ApiService

  constructor() {
    this.api = new ApiService(BASE_URL)
  }

  /**
   * Получение информации о карте по ID
   */
  async getCardInfo(id: string): Promise<CartData> {
    return this.api.get<CartData>(`/test/${id}`)
  }

  /**
   * Отправка данных инвойса (с имитацией ответа)
   */
  async send(card: CartData): Promise<{ success: boolean; message: string }> {
    // имитация сетевой задержки
    await new Promise(resolve => setTimeout(resolve, 800))

    const isSuccess = Math.random() > 0.3 // 70% шанс успеха

    if (isSuccess) {
      return { success: true, message: 'Инвойс успешно отправлен' }
    } else {
      throw new Error('Ошибка при отправке инвойса')
    }
  }
}

export const cardApiService = new CardApiService()
