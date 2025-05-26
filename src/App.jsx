import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-900 dark:via-surface-800 dark:to-surface-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!text-sm"
        toastClassName="!rounded-xl !shadow-soft"
        bodyClassName="!font-medium"
        progressClassName="!bg-gradient-to-r !from-primary !to-primary-light"
      />
    </div>
  )
}

export default App