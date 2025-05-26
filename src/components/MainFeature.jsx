import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design TaskFlow Interface',
      description: 'Create wireframes and mockups for the new task management interface',
      completed: false,
      priority: 'high',
      dueDate: new Date(),
      category: 'Design',
      tags: ['UI/UX', 'Wireframes']
    },
    {
      id: '2',
      title: 'Write Documentation',
      description: 'Complete user documentation and API references',
      completed: true,
      priority: 'medium',
      dueDate: new Date(Date.now() - 86400000),
      category: 'Documentation',
      tags: ['Writing', 'API']
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'General',
    tags: ''
  })

  const [categories, setCategories] = useState([
    { id: '1', name: 'General', icon: 'Folder', color: 'bg-gray-100 text-gray-600' },
    { id: '2', name: 'Work', icon: 'Briefcase', color: 'bg-blue-100 text-blue-600' },
    { id: '3', name: 'Personal', icon: 'User', color: 'bg-green-100 text-green-600' },
    { id: '4', name: 'Design', icon: 'Palette', color: 'bg-purple-100 text-purple-600' },
    { id: '5', name: 'Development', icon: 'Code', color: 'bg-indigo-100 text-indigo-600' },
    { id: '6', name: 'Documentation', icon: 'FileText', color: 'bg-yellow-100 text-yellow-600' }
  ])
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('')
  const [newCategoryForm, setNewCategoryForm] = useState({
    name: '',
    icon: 'Folder',
    color: 'bg-gray-100 text-gray-600'
  })

  const availableIcons = [
    'Folder', 'Briefcase', 'User', 'Palette', 'Code', 'FileText', 'Home', 'Heart',
    'Star', 'Target', 'Zap', 'Coffee', 'Book', 'Camera', 'Music', 'ShoppingCart'
  ]

  const availableColors = [
    'bg-gray-100 text-gray-600',
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-purple-100 text-purple-600',
    'bg-indigo-100 text-indigo-600',
    'bg-yellow-100 text-yellow-600',
    'bg-red-100 text-red-600',
    'bg-pink-100 text-pink-600',
    'bg-orange-100 text-orange-600',
    'bg-teal-100 text-teal-600'
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { value: 'medium', label: 'Medium', color: 'text-secondary', bg: 'bg-yellow-100' },
    { value: 'high', label: 'High', color: 'text-red-600', bg: 'bg-red-100' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Task title is required')
      return
    }

    const taskData = {
      ...formData,
      id: editingTask ? editingTask.id : Date.now().toString(),
      dueDate: new Date(formData.dueDate),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date(),
      updatedAt: new Date()
    }

    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? taskData : task))
      toast.success('Task updated successfully!')
    } else {
      setTasks([...tasks, taskData])
      toast.success('Task created successfully!')
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      category: 'General',
      tags: ''
    })
    setShowForm(false)
    setEditingTask(null)
  }


  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.toISOString().split('T')[0],
      category: task.category,
      tags: task.tags.join(', ')
    })
    setShowForm(true)
  }


  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    toast.success('Task deleted successfully!')
  }

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ))
    const task = tasks.find(t => t.id === taskId)
    toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed!')
  }

  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter
      const matchesTag = !tagFilter || task.tags.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      
      switch (filter) {
        case 'completed':
          return task.completed && matchesSearch && matchesCategory && matchesTag
        case 'pending':
          return !task.completed && matchesSearch && matchesCategory && matchesTag
        case 'overdue':
          return !task.completed && isPast(task.dueDate) && !isToday(task.dueDate) && matchesSearch && matchesCategory && matchesTag
        default:
          return matchesSearch && matchesCategory && matchesTag
      }
    })

    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'title':
          return a.title.localeCompare(b.title)
        case 'dueDate':
        default:
          return new Date(a.dueDate) - new Date(b.dueDate)
      }
    })

  const getDateLabel = (date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isPast(date)) return 'Overdue'
    return format(date, 'MMM dd')
  }

  const getPriorityConfig = (priority) => {
    return priorities.find(p => p.value === priority) || priorities[1]
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && isPast(t.dueDate) && !isToday(t.dueDate)).length
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    
    if (!newCategoryForm.name.trim()) {
      toast.error('Category name is required')
      return
    }

    const categoryData = {
      ...newCategoryForm,
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      name: newCategoryForm.name.trim()
    }

    if (editingCategory) {
      setCategories(categories.map(cat => cat.id === editingCategory.id ? categoryData : cat))
      toast.success('Category updated successfully!')
    } else {
      setCategories([...categories, categoryData])
      toast.success('Category created successfully!')
    }

    resetCategoryForm()
  }

  const resetCategoryForm = () => {
    setNewCategoryForm({
      name: '',
      icon: 'Folder',
      color: 'bg-gray-100 text-gray-600'
    })
    setShowCategoryManager(false)
    setEditingCategory(null)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setNewCategoryForm({
      name: category.name,
      icon: category.icon,
      color: category.color
    })
    setShowCategoryManager(true)
  }

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? Tasks using this category will be moved to "General".')) {
      const categoryToDelete = categories.find(cat => cat.id === categoryId)
      
      // Update tasks that use this category
      setTasks(tasks.map(task => 
        task.category === categoryToDelete.name 
          ? { ...task, category: 'General' }
          : task
      ))
      
      setCategories(categories.filter(cat => cat.id !== categoryId))
      toast.success('Category deleted successfully!')
    }
  }

  const getCategoryConfig = (categoryName) => {
    return categories.find(cat => cat.name === categoryName) || categories[0]
  }

  const getAllTags = () => {
    const allTags = new Set()
    tasks.forEach(task => {
      task.tags.forEach(tag => allTags.add(tag))
    })
    return Array.from(allTags).sort()
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          {[
            { label: 'Total', value: stats.total, icon: 'List', color: 'primary' },
            { label: 'Completed', value: stats.completed, icon: 'CheckCircle', color: 'emerald' },
            { label: 'Pending', value: stats.pending, icon: 'Clock', color: 'secondary' },
            { label: 'Overdue', value: stats.overdue, icon: 'AlertTriangle', color: 'red' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-3 sm:p-4 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-surface-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className={`w-4 h-4 sm:w-5 sm:h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft p-4 sm:p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">
              Task Manager
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-soft hover:shadow-card transform hover:-translate-y-0.5"
            >
              <ApperIcon name="Plus" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Add Task</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="relative">
              <ApperIcon name="Tag" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Filter by tag..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              onClick={() => setShowCategoryManager(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 sm:py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium rounded-xl hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-200"
            >
              <ApperIcon name="Settings" className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Categories</span>
            </button>
          </div>

          <div className="text-sm text-surface-600 dark:text-surface-400 flex items-center justify-between">
            <span>{filteredAndSortedTasks.length} task{filteredAndSortedTasks.length !== 1 ? 's' : ''}</span>
            {(categoryFilter !== 'all' || tagFilter) && (
              <button
                onClick={() => {
                  setCategoryFilter('all')
                  setTagFilter('')
                }}
                className="text-primary hover:text-primary-dark transition-colors duration-200"
              >
                Clear filters
              </button>
            )}
          </div>

        </motion.div>

        {/* Task Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft p-4 sm:p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-white">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                      placeholder="Enter task title..."
                      required
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base resize-none"
                      placeholder="Task description (optional)..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className="w-full px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="flex-1 px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowCategoryManager(true)}
                        className="px-3 py-2 sm:py-3 bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 rounded-xl hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-200"
                        title="Manage Categories"
                      >
                        <ApperIcon name="Plus" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                      placeholder="tag1, tag2, tag3..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-soft hover:shadow-card transform hover:-translate-y-0.5"
                  >
                    <ApperIcon name={editingTask ? "Save" : "Plus"} className="w-4 h-4" />
                    <span>{editingTask ? 'Update Task' : 'Create Task'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium rounded-xl hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Manager Modal */}
        <AnimatePresence>
          {showCategoryManager && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && resetCategoryForm()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              >
                <div className="p-6 border-b border-surface-200 dark:border-surface-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
                      Manage Categories
                    </h3>
                    <button
                      onClick={resetCategoryForm}
                      className="p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                  {/* Add/Edit Category Form */}
                  <div className="mb-6 p-4 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
                    <h4 className="text-lg font-medium text-surface-900 dark:text-white mb-4">
                      {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h4>
                    <form onSubmit={handleCategorySubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={newCategoryForm.name}
                          onChange={(e) => setNewCategoryForm({...newCategoryForm, name: e.target.value})}
                          className="w-full px-4 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          placeholder="Enter category name..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Icon
                          </label>
                          <select
                            value={newCategoryForm.icon}
                            onChange={(e) => setNewCategoryForm({...newCategoryForm, icon: e.target.value})}
                            className="w-full px-4 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          >
                            {availableIcons.map(icon => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Color
                          </label>
                          <select
                            value={newCategoryForm.color}
                            onChange={(e) => setNewCategoryForm({...newCategoryForm, color: e.target.value})}
                            className="w-full px-4 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          >
                            {availableColors.map(color => (
                              <option key={color} value={color}>
                                {color.split(' ')[0].replace('bg-', '').replace('-100', '')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-600">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${newCategoryForm.color}`}>
                          <ApperIcon name={newCategoryForm.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-surface-900 dark:text-white font-medium">
                          {newCategoryForm.name || 'Category Preview'}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-200"
                        >
                          <ApperIcon name={editingCategory ? "Save" : "Plus"} className="w-4 h-4" />
                          <span>{editingCategory ? 'Update' : 'Add'} Category</span>
                        </button>
                        {editingCategory && (
                          <button
                            type="button"
                            onClick={resetCategoryForm}
                            className="px-4 py-2 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium rounded-xl hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-200"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Existing Categories */}
                  <div>
                    <h4 className="text-lg font-medium text-surface-900 dark:text-white mb-4">
                      Existing Categories ({categories.length})
                    </h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-white dark:bg-surface-700 rounded-xl border border-surface-200 dark:border-surface-600">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                              <ApperIcon name={category.icon} className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {category.name}
                              </span>
                              <div className="text-xs text-surface-500 dark:text-surface-400">
                                {tasks.filter(task => task.category === category.name).length} tasks
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="p-2 text-surface-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                            >
                              <ApperIcon name="Edit2" className="w-4 h-4" />
                            </button>
                            {categories.length > 1 && (
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-2 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                <ApperIcon name="Trash2" className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Task List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3 sm:space-y-4"
        >
          <AnimatePresence>
            {filteredAndSortedTasks.map((task, index) => {
              const priorityConfig = getPriorityConfig(task.priority)
              const isOverdue = !task.completed && isPast(task.dueDate) && !isToday(task.dueDate)
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft hover:shadow-task-hover transition-all duration-200 p-4 sm:p-6 ${
                    task.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-surface-300 dark:border-surface-600 hover:border-emerald-500'
                      }`}
                    >
                      {task.completed && <ApperIcon name="Check" className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-semibold transition-all duration-200 ${
                          task.completed
                            ? 'line-through text-surface-500 dark:text-surface-400'
                            : 'text-surface-900 dark:text-white'
                        }`}>
                          {task.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
                            {priorityConfig.label}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                            isOverdue
                              ? 'bg-red-100 text-red-600'
                              : isToday(task.dueDate)
                              ? 'bg-secondary-100 text-secondary-600'
                              : 'bg-surface-100 text-surface-600'
                          }`}>
                            {getDateLabel(task.dueDate)}
                          </span>
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 mb-2 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${getCategoryConfig(task.category).color}`}>
                              <ApperIcon name={getCategoryConfig(task.category).icon} className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                              {task.category}
                            </span>
                          </div>

                          {task.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {task.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                                  #{tag}
                                </span>
                              ))}
                              {task.tags.length > 2 && (
                                <span className="text-xs text-surface-500 px-2 py-1">
                                  +{task.tags.length - 2} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleEdit(task)}
                            className="p-1.5 sm:p-2 text-surface-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                          >
                            <ApperIcon name="Edit2" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="p-1.5 sm:p-2 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <ApperIcon name="Trash2" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredAndSortedTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-surface-100 dark:bg-surface-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="ListTodo" className="w-8 h-8 sm:w-10 sm:h-10 text-surface-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first task to get started!'
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default MainFeature