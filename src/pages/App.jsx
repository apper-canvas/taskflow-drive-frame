import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-neu-light">
              <ApperIcon name="CheckSquare" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                Efficient Task Management
              </p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-3 rounded-xl bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm border border-surface-200/50 dark:border-surface-700/50 hover:bg-white/70 dark:hover:bg-surface-800/70 transition-all duration-200 shadow-soft"
          >
            <ApperIcon 
              name={darkMode ? "Sun" : "Moon"} 
              className="w-4 h-4 sm:w-5 sm:h-5 text-surface-700 dark:text-surface-300" 
            />
          </button>
        </div>
      </motion.header>

      {/* Main Feature Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10"
      >
        <MainFeature />
      </motion.section>


    </div>
  )
}

export default Home