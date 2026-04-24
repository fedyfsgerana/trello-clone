import { defineStore } from 'pinia'
import api from '../services/api'

export const useTaskStore = defineStore('task', {
    actions: {
        async createTask(columnId, data) {
            const res = await api.post(`/columns/${columnId}/tasks`, data)
            return res.data
        },

        async updateTask(taskId, data) {
            const res = await api.put(`/tasks/${taskId}`, data)
            return res.data
        },

        async deleteTask(taskId) {
            await api.delete(`/tasks/${taskId}`)
        },

        async moveTask(taskId, columnId, position) {
            await api.patch(`/tasks/${taskId}/move`, { column_id: columnId, position })
        },

        async createColumn(boardId, title) {
            const res = await api.post(`/boards/${boardId}/columns`, { title })
            return res.data
        },

        async deleteColumn(columnId) {
            await api.delete(`/columns/${columnId}`)
        },
    },
})