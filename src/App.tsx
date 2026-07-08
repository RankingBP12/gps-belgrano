import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthProvider'
import { AdminAuthProvider } from '@/contexts/AdminAuthProvider'
import { AppRoutes } from '@/routes/AppRoutes'

// Basename para GitHub Pages (/gps-belgrano); en dev queda vacío.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <AdminAuthProvider>
          <AppRoutes />
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
