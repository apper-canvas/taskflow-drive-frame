import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const Features = () => {
  const features = [
    {
      icon: 'CheckSquare',
      title: 'Smart Task Management',
      description: 'Create, organize, and track tasks with intelligent categorization, priority levels, and due date management.',
      benefits: ['Unlimited tasks', 'Custom categories', 'Priority levels', 'Due date tracking']
    },
    {
      icon: 'Filter',
      title: 'Advanced Filtering & Search',
      description: 'Find exactly what you need with powerful search, filtering by category, tags, status, and priority.',
      benefits: ['Real-time search', 'Multiple filters', 'Tag-based organization', 'Quick access']
    },
    {
      icon: 'Calendar',
      title: 'Smart Scheduling',
      description: 'Never miss a deadline with intelligent date management, overdue detection, and timeline visualization.',
      benefits: ['Overdue alerts', 'Date labels', 'Timeline view', 'Schedule optimization']
    },
    {
      icon: 'BarChart3',
      title: 'Progress Analytics',
      description: 'Track your productivity with comprehensive statistics and visual progress indicators.',
      benefits: ['Completion rates', 'Productivity trends', 'Goal tracking', 'Performance insights']
    },
    {
      icon: 'Palette',
      title: 'Customizable Categories',
      description: 'Create and customize categories with custom icons and colors to match your workflow.',
      benefits: ['Custom icons', 'Color coding', 'Flexible organization', 'Visual identification']
    },
    {
      icon: 'Tag',
      title: 'Flexible Tagging System',
      description: 'Organize tasks with tags for cross-category organization and improved searchability.',
      benefits: ['Unlimited tags', 'Cross-reference', 'Easy filtering', 'Flexible grouping']
    }
  ]

  const benefits = [
    {
      icon: 'Clock',
      title: 'Save Time',
      description: 'Reduce time spent organizing and tracking tasks by up to 60% with our intelligent system.',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: 'TrendingUp',
      title: 'Boost Productivity',
      description: 'Increase your daily productivity with better task prioritization and progress tracking.',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: 'Shield',
      title: 'Reduce Stress',
      description: 'Never forget important tasks and reduce mental load with our comprehensive task management.',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      icon: 'Target',
      title: 'Achieve Goals',
      description: 'Turn your goals into actionable tasks and track progress toward meaningful achievements.',
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ]

  const stats = [
    { value: '10,000+', label: 'Tasks Completed' },
    { value: '95%', label: 'User Satisfaction' },
    { value: '60%', label: 'Time Saved' },
    { value: '24/7', label: 'Available' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-900 dark:via-surface-800 dark:to-surface-700">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6">
                Powerful Features for
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> 
                  {' '}Maximum Productivity
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-3xl mx-auto">
                Discover how TaskFlow revolutionizes task management with intelligent features 
                designed to streamline your workflow and boost productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/app"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-2xl hover:from-primary-dark hover:to-primary transform hover:-translate-y-1 transition-all duration-200 shadow-soft hover:shadow-card"
                >
                  <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                  Try TaskFlow Now
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-surface-800/80 text-surface-900 dark:text-white font-semibold rounded-2xl hover:bg-white dark:hover:bg-surface-700 transform hover:-translate-y-1 transition-all duration-200 shadow-soft hover:shadow-card backdrop-blur-sm"
                >
                  <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="text-center p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-surface-600 dark:text-surface-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
              TaskFlow combines powerful features with intuitive design to create the ultimate task management experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                      <ApperIcon name="Check" className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Why Choose TaskFlow?
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
              Join thousands of users who have transformed their productivity with TaskFlow's innovative approach to task management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex items-start gap-4 p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft"
              >
                <div className={`w-12 h-12 ${benefit.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <ApperIcon name={benefit.icon} className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-8 sm:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-surface-200/50 dark:border-surface-700/50 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Rocket" className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
              Experience the power of TaskFlow firsthand. Create your first task, organize your workflow, 
              and discover how our intelligent features can revolutionize the way you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/app"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-2xl hover:from-primary-dark hover:to-primary transform hover:-translate-y-1 transition-all duration-200 shadow-soft hover:shadow-card"
              >
                <ApperIcon name="ArrowRight" className="w-5 h-5 mr-2" />
                Start Using TaskFlow
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-surface-800/80 text-surface-900 dark:text-white font-semibold rounded-2xl hover:bg-white dark:hover:bg-surface-700 transform hover:-translate-y-1 transition-all duration-200 shadow-soft hover:shadow-card backdrop-blur-sm">
                <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Features Highlight */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft">
              <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
                Smart Automation
              </h3>
              <p className="text-surface-600 dark:text-surface-300 mb-4">
                TaskFlow learns from your patterns and suggests optimizations to help you work more efficiently. 
                Our intelligent system automatically categorizes tasks, suggests due dates, and helps prioritize your workload.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Auto-categorization', 'Smart suggestions', 'Pattern recognition', 'Workflow optimization'].map(feature => (
                  <span key={feature} className="px-3 py-1 bg-primary/10 text-primary-600 rounded-lg text-sm font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <ApperIcon name="Zap" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-surface-600 dark:text-surface-300 text-sm">
                Built with modern technology for instant loading and real-time updates. No waiting, just productivity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Features