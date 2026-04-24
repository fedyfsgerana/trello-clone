import { defineStore } from 'pinia'
import api from '../services/api'

export const useBoardStore = defineStore('board', {
    state: () => ({
        boards: [],
        currentBoard: null,
    }),

    actions: {
        async fetchBoards() {
            const res = await api.get('/boards')
            this.boards = res.data
        },

        async createBoard(data) {
            const res = await api.post('/boards', data)
            this.boards.unshift(res.data)
        },

        async fetchBoardById(id) {
            const res = await api.get(`/boards/${id}`)
            this.currentBoard = res.data
        },

        async updateBoard(id, data) {
            const res = await api.put(`/boards/${id}`, data)
            const index = this.boards.findIndex((b) => b.id === id)
            if (index !== -1) this.boards[index] = res.data
        },

        async deleteBoard(id) {
            await api.delete(`/boards/${id}`)
            this.boards = this.boards.filter((b) => b.id !== id)
        },
    },
})