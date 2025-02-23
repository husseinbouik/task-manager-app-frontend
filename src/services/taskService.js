import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your Laravel API URL

const taskService = {
    async getAllTasks() {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.get(`${API_BASE_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in the Authorization header
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    async createTask(taskData) {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in the Authorization header
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getTaskById(taskId) {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in the Authorization header
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updateTask(taskId, taskData) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Ensure Content-Type is set
            },
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
     async deleteTask(taskId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default taskService;