import localApi from './localApi'

export const userThemeApi = {
  async getTheme(userId: number) {
    return await localApi.get(`/api/theme/get/${userId}`).then(res => res.data)
  },

  async setTheme(userId: number, themeAlias: string) {
    return await localApi
      .post(`/api/theme/set/${userId}`, {
        themeAlias,
      })
      .then(res => res.data)
  },
}
