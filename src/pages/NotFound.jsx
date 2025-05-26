import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8"
        >
          <ApperIcon name="FileQuestion" className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-6xl font-bold text-surface-900 dark:text-white mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl sm:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-surface-600 dark:text-surface-400 mb-8"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-soft hover:shadow-card transform hover:-translate-y-0.5"
          >
            <ApperIcon name="Home" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound