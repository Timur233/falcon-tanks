import backendApi from '@/api/backendApi'

export interface LeaderboardNewLeaderRequest {
  data: {
    [key: string]: any
  }
  ratingFieldName: string
  teamName: string
}

// Запрос для получения лидерборда
interface LeaderboardRequest {
  ratingFieldName: string
  cursor: number
  limit: number
}

// Ответ с ошибкой
export interface ErrorResponse {
  reason: string
}

const TEAM_NAME = 'falcon-tanks'
const BASE_URL = '/leaderboard'

export const leaderboardApi = {
  // Добавление нового результата
  async addScore(userData: {
    id: string
    login: string
    avatar?: string
    score: number
  }): Promise<void> {
    const request: LeaderboardNewLeaderRequest = {
      data: userData,
      ratingFieldName: 'score',
      teamName: TEAM_NAME,
    }

    try {
      await backendApi({
        method: 'post',
        url: '/leaderboard',
        data: request,
      })
    } catch (error: any) {
      if (error.response?.data?.reason) {
        throw new Error(error.response.data.reason)
      }
      throw error
    }
  },

  // Получение лидерборда
  async getLeaderboard(cursor = 0, limit = 6) {
    const request: LeaderboardRequest = {
      ratingFieldName: 'score',
      cursor,
      limit,
    }

    try {
      const response = await backendApi({
        method: 'post',
        url: `${BASE_URL}/${TEAM_NAME}`,
        data: request,
      })
      return response.data
    } catch (error: any) {
      if (error.response?.data?.reason) {
        throw new Error(error.response.data.reason)
      }
      throw error
    }
  },
}
