import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { AuthContext } from '../App'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Dashboard = () => {
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Show loading if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-900 dark:via-surface-800 dark:to-surface-700">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-soft mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-surface-600 dark:text-surface-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-900 dark:via-surface-800 dark:to-surface-700">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Dashboard Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  TaskFlow
                </h1>
                {user?.firstName && (
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Welcome back, {user.firstName}!
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm border border-surface-200/50 dark:border-surface-700/50 rounded-xl hover:bg-white/80 dark:hover:bg-surface-700/80 transition-all duration-200 shadow-soft"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-600 dark:text-surface-400" 
                />
              </button>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-3 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm border border-surface-200/50 dark:border-surface-700/50 rounded-xl hover:bg-white/80 dark:hover:bg-surface-700/80 transition-all duration-200 shadow-soft text-surface-600 dark:text-surface-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <ApperIcon name="LogOut" className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="relative z-10 pt-8">
        <MainFeature />
      </main>
    </div>
  )
}

export default Dashboard