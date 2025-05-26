import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const features = [
    {
      icon: "Zap",
      title: "Lightning Fast",
      description: "Create and organize tasks in seconds with our intuitive interface designed for speed."
    },
    {
      icon: "Target",
      title: "Priority Focused",
      description: "Smart priority system helps you focus on what matters most with deadline tracking."
    },
    {
      icon: "BarChart3",
      title: "Progress Tracking",
      description: "Visual insights and analytics to track your productivity and achievement patterns."
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description: "Share tasks and collaborate seamlessly with your team members and colleagues."
    },
    {
      icon: "Smartphone",
      title: "Cross Platform",
      description: "Access your tasks anywhere, anytime on desktop, tablet, or mobile devices."
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "Your data is encrypted and secure with enterprise-grade security measures."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      text: "TaskFlow transformed how our team manages projects. The intuitive interface and powerful features make task management effortless.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      company: "Independent",
      text: "As a freelancer, staying organized is crucial. TaskFlow helps me prioritize clients and never miss deadlines.",
      avatar: "👨‍🎨"
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      company: "InnovateLab",
      text: "The clean design and powerful features help our growing team stay aligned and productive.",
      avatar: "👩‍💻"
    }
  ]

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

          <div className="flex items-center space-x-4">
            <Link
              to="/app"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors duration-200 text-sm font-medium"
            >
              Launch App
            </Link>
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
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-surface-900 dark:text-white mb-6">
              Master Your
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Productivity
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform chaos into clarity with TaskFlow - the intelligent task management platform that adapts to your workflow and amplifies your productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/app"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl hover:from-primary-dark hover:to-primary transition-all duration-300 text-lg font-semibold shadow-task hover:shadow-task-hover transform hover:scale-105"
              >
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                Get Started Free
              </Link>
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm border border-surface-200/50 dark:border-surface-700/50 text-surface-900 dark:text-white rounded-2xl hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all duration-300 text-lg font-semibold">
                <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              Everything You Need
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="p-6 sm:p-8 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-3xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft hover:shadow-card transition-all duration-300 group hover:scale-105"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name={feature.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              Loved by Professionals
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with TaskFlow
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="p-6 sm:p-8 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-3xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-surface-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm rounded-3xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto">
              Join the productivity revolution today and experience the difference TaskFlow can make in your daily workflow.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl hover:from-primary-dark hover:to-primary transition-all duration-300 text-lg font-semibold shadow-task hover:shadow-task-hover transform hover:scale-105"
            >
              Start Managing Tasks Now
              <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 border-t border-surface-200/50 dark:border-surface-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-surface-600 dark:text-surface-400">
            © 2024 TaskFlow. Built with passion for productivity.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing