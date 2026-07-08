import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthProvider'
import { AdminAuthProvider } from '@/contexts/AdminAuthProvider'
import { AppRoutes } from '@/routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <AppRoutes />
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
