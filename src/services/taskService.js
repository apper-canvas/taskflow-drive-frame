// Task Service - Handles all task-related database operations
// Uses the task35 table from the provided Tables & Fields JSON

class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'task35'
    
    // All available fields from the task35 table
    this.allFields = [
      'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'title', 'description', 'completed', 'priority', 'due_date', 'category', 'created_at', 'updated_at'
    ]
    
    // Only updateable fields for create/update operations
    this.updateableFields = [
      'Name', 'Tags', 'Owner', 'title', 'description', 'completed', 'priority', 'due_date', 'category', 'created_at', 'updated_at'
    ]
  }

  async fetchTasks(params = {}) {
    try {
      const queryParams = {
        fields: this.allFields, // Use all fields for display
        orderBy: [
          {
            fieldName: params.sortBy === 'priority' ? 'priority' : params.sortBy === 'title' ? 'title' : 'due_date',
            SortType: 'ASC'
          }
        ],
        pagingInfo: {
          limit: params.limit || 100,
          offset: params.offset || 0
        },
        ...params
      }

      const response = await this.apperClient.fetchRecords(this.tableName, queryParams)
      
      if (!response || !response.data) {
        return []
      }
      
      // Transform the data to match the UI format
      return response.data.map(task => ({
        id: task.Id,
        title: task.title || task.Name || '',
        description: task.description || '',
        completed: this.parseCheckboxValue(task.completed),
        priority: task.priority || 'medium',
        dueDate: new Date(task.due_date || task.created_at || new Date()),
        category: task.category || 'General',
        tags: this.parseTagValue(task.Tags),
        createdAt: new Date(task.CreatedOn || task.created_at || new Date()),
        updatedAt: new Date(task.ModifiedOn || task.updated_at || new Date())
      }))
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  }

  async getTaskById(taskId) {
    try {
      const params = {
        fields: this.allFields
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, taskId, params)
      
      if (!response || !response.data) {
        return null
      }
      
      const task = response.data
      return {
        id: task.Id,
        title: task.title || task.Name || '',
        description: task.description || '',
        completed: this.parseCheckboxValue(task.completed),
        priority: task.priority || 'medium',
        dueDate: new Date(task.due_date || task.created_at || new Date()),
        category: task.category || 'General',
        tags: this.parseTagValue(task.Tags),
        createdAt: new Date(task.CreatedOn || task.created_at || new Date()),
        updatedAt: new Date(task.ModifiedOn || task.updated_at || new Date())
      }
    } catch (error) {
      console.error(`Error fetching task with ID ${taskId}:`, error)
      return null
    }
  }

  async createTask(taskData) {
    try {
      const now = new Date().toISOString()
      
      // Only include updateable fields
      const recordData = {
        Name: taskData.title || '',
        title: taskData.title || '',
        description: taskData.description || '',
        completed: this.formatCheckboxValue(taskData.completed || false),
        priority: taskData.priority || 'medium',
        due_date: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: taskData.category || 'General',
        Tags: this.formatTagValue(taskData.tags || []),
        created_at: now,
        updated_at: now
      }

      const params = {
        records: [recordData]
      }

      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (response && response.success && response.results && response.results[0] && response.results[0].success) {
        const createdTask = response.results[0].data
        return {
          id: createdTask.Id,
          title: createdTask.title || createdTask.Name || '',
          description: createdTask.description || '',
          completed: this.parseCheckboxValue(createdTask.completed),
          priority: createdTask.priority || 'medium',
          dueDate: new Date(createdTask.due_date || createdTask.created_at || new Date()),
          category: createdTask.category || 'General',
          tags: this.parseTagValue(createdTask.Tags),
          createdAt: new Date(createdTask.CreatedOn || createdTask.created_at || new Date()),
          updatedAt: new Date(createdTask.ModifiedOn || createdTask.updated_at || new Date())
        }
      } else {
        throw new Error('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const now = new Date().toISOString()
      
      // Only include updateable fields plus Id
      const recordData = {
        Id: taskId,
        Name: taskData.title || '',
        title: taskData.title || '',
        description: taskData.description || '',
        completed: this.formatCheckboxValue(taskData.completed || false),
        priority: taskData.priority || 'medium',
        due_date: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: taskData.category || 'General',
        Tags: this.formatTagValue(taskData.tags || []),
        updated_at: now
      }

      const params = {
        records: [recordData]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (response && response.success && response.results && response.results[0] && response.results[0].success) {
        const updatedTask = response.results[0].data
        return {
          id: updatedTask.Id,
          title: updatedTask.title || updatedTask.Name || '',
          description: updatedTask.description || '',
          completed: this.parseCheckboxValue(updatedTask.completed),
          priority: updatedTask.priority || 'medium',
          dueDate: new Date(updatedTask.due_date || updatedTask.created_at || new Date()),
          category: updatedTask.category || 'General',
          tags: this.parseTagValue(updatedTask.Tags),
          createdAt: new Date(updatedTask.CreatedOn || updatedTask.created_at || new Date()),
          updatedAt: new Date(updatedTask.ModifiedOn || updatedTask.updated_at || new Date())
        }
      } else {
        throw new Error('Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  }

  async deleteTask(taskId) {
    try {
      const params = {
        RecordIds: [taskId]
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (response && response.success && response.results && response.results[0] && response.results[0].success) {
        return true
      } else {
        throw new Error('Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }

  async deleteTasks(taskIds) {
    try {
      const params = {
        RecordIds: taskIds
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (response && response.success) {
        const successfulDeletions = response.results.filter(result => result.success)
        return successfulDeletions.length
      } else {
        throw new Error('Failed to delete tasks')
      }
    } catch (error) {
      console.error('Error deleting tasks:', error)
      throw error
    }
  }

  // Helper methods for data formatting
  parseCheckboxValue(value) {
    if (typeof value === 'string') {
      return value.toLowerCase().includes('completed') || value.toLowerCase().includes('true')
    }
    return Boolean(value)
  }

  formatCheckboxValue(completed) {
    return completed ? 'completed' : ''
  }

  parseTagValue(value) {
    if (!value) return []
    if (Array.isArray(value)) return value
    return value.split(',').map(tag => tag.trim()).filter(tag => tag)
  }

  formatTagValue(tags) {
    if (Array.isArray(tags)) {
      return tags.join(',')
    }
    return String(tags || '')
  }
}

export default new TaskService()