// Category Service - Handles all category-related database operations
// Uses the category2 table from the provided Tables & Fields JSON

class CategoryService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'category2'
    
    // All available fields from the category2 table
    this.allFields = [
      'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'icon', 'color'
    ]
    
    // Only updateable fields for create/update operations
    this.updateableFields = [
      'Name', 'Tags', 'Owner', 'icon', 'color'
    ]
  }

  async fetchCategories(params = {}) {
    try {
      const queryParams = {
        fields: this.allFields, // Use all fields for display
        orderBy: [
          {
            fieldName: 'Name',
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
      
      if (!response || !response.data || response.data.length === 0) {
        // Return default categories if none exist
        return this.getDefaultCategories()
      }
      
      // Transform the data to match the UI format
      return response.data.map(category => ({
        id: category.Id,
        name: category.Name || '',
        icon: category.icon || 'Folder',
        color: category.color || 'bg-gray-100 text-gray-600'
      }))
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Return default categories on error
      return this.getDefaultCategories()
    }
  }

  async getCategoryById(categoryId) {
    try {
      const params = {
        fields: this.allFields
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, categoryId, params)
      
      if (!response || !response.data) {
        return null
      }
      
      const category = response.data
      return {
        id: category.Id,
        name: category.Name || '',
        icon: category.icon || 'Folder',
        color: category.color || 'bg-gray-100 text-gray-600'
      }
    } catch (error) {
      console.error(`Error fetching category with ID ${categoryId}:`, error)
      return null
    }
  }

  async createCategory(categoryData) {
    try {
      // Only include updateable fields
      const recordData = {
        Name: categoryData.name || '',
        icon: categoryData.icon || 'Folder',
        color: categoryData.color || 'bg-gray-100 text-gray-600'
      }

      const params = {
        records: [recordData]
      }

      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (response && response.success && response.results && response.results[0] && response.results[0].success) {
        const createdCategory = response.results[0].data
        return {
          id: createdCategory.Id,
          name: createdCategory.Name || '',
          icon: createdCategory.icon || 'Folder',
          color: createdCategory.color || 'bg-gray-100 text-gray-600'
        }
      } else {
        throw new Error('Failed to create category')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      // Only include updateable fields plus Id
      const recordData = {
        Id: categoryId,
        Name: categoryData.name || '',
        icon: categoryData.icon || 'Folder',
        color: categoryData.color || 'bg-gray-100 text-gray-600'
      }

      const params = {
        records: [recordData]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (response && response.success && response.results && response.results[0] && response.results[0].success) {
        const updatedCategory = response.results[0].data
        return {
          id: updatedCategory.Id,
          name: updatedCategory.Name || '',
          icon: updatedCategory.icon || 'Folder',
          color: updatedCategory.color || 'bg-gray-100 text-gray-600'
        }
      } else {
        throw new Error('Failed to update category')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  async deleteCategory(categoryId) {
    try {
      const params = {
        RecordIds: [categoryId]
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (response && response.success && response.results && response.results[0] && response.results[0].success) {
        return true
      } else {
        throw new Error('Failed to delete category')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }

  // Default categories to ensure the app works even with empty database
  getDefaultCategories() {
    return [
      { id: 'default-1', name: 'General', icon: 'Folder', color: 'bg-gray-100 text-gray-600' },
      { id: 'default-2', name: 'Work', icon: 'Briefcase', color: 'bg-blue-100 text-blue-600' },
      { id: 'default-3', name: 'Personal', icon: 'User', color: 'bg-green-100 text-green-600' },
      { id: 'default-4', name: 'Design', icon: 'Palette', color: 'bg-purple-100 text-purple-600' },
      { id: 'default-5', name: 'Development', icon: 'Code', color: 'bg-indigo-100 text-indigo-600' },
      { id: 'default-6', name: 'Documentation', icon: 'FileText', color: 'bg-yellow-100 text-yellow-600' }
    ]
  }

  // Helper method to ensure default categories exist in database
  async ensureDefaultCategories() {
    try {
      const existingCategories = await this.fetchCategories()
      
      if (existingCategories.length === 0 || existingCategories.every(cat => cat.id.startsWith('default-'))) {
        const defaultCategories = this.getDefaultCategories()
        
        for (const category of defaultCategories) {
          try {
            await this.createCategory({
              name: category.name,
              icon: category.icon,
              color: category.color
            })
          } catch (error) {
            console.warn(`Failed to create default category ${category.name}:`, error)
          }
        }
        
        // Fetch updated categories
        return await this.fetchCategories()
      }
      
      return existingCategories
    } catch (error) {
      console.error('Error ensuring default categories:', error)
      return this.getDefaultCategories()
    }
  }
}

export default new CategoryService()