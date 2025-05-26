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

  const categories = ['General', 'Work', 'Personal', 'Design', 'Development', 'Documentation']
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
                           task.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      switch (filter) {
        case 'completed':
          return task.completed && matchesSearch
        case 'pending':
          return !task.completed && matchesSearch
        case 'overdue':
          return !task.completed && isPast(task.dueDate) && !isToday(task.dueDate) && matchesSearch
        default:
          return matchesSearch
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>

            <div className="text-sm text-surface-600 dark:text-surface-400 flex items-center">
              <span>{filteredAndSortedTasks.length} task{filteredAndSortedTasks.length !== 1 ? 's' : ''}</span>
            </div>
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
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 sm:py-3 bg-white/80 dark:bg-surface-700/80 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
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
                          <span className="text-xs text-surface-500 dark:text-surface-400 px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-lg">
                            {task.category}
                          </span>
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