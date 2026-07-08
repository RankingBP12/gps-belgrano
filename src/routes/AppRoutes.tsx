import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { AdminRoute } from './AdminRoute'

import { HomePage } from '@/pages/public/HomePage'
import { CategoryPage } from '@/pages/public/CategoryPage'
import { ProfessionalProfilePage } from '@/pages/public/ProfessionalProfilePage'
import { HowItWorksPage } from '@/pages/public/HowItWorksPage'
import { PublishServicePage } from '@/pages/public/PublishServicePage'
import { ContactPage } from '@/pages/public/ContactPage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'

import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminStatsPage } from '@/pages/admin/AdminStatsPage'
import { AdminCategoriesPage } from '@/pages/admin/AdminCategoriesPage'
import { AdminProfessionalsPage } from '@/pages/admin/AdminProfessionalsPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Público */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="como-funciona" element={<HowItWorksPage />} />
        <Route path="publicar" element={<PublishServicePage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="profesional/:slug" element={<ProfessionalProfilePage />} />
        {/* Categoría por slug en la raíz — debe ir al final del grupo. */}
        <Route path=":categorySlug" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Panel admin (rutas ocultas, no enlazadas desde el sitio público) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminStatsPage />} />
        <Route path="categorias" element={<AdminCategoriesPage />} />
        <Route path="profesionales" element={<AdminProfessionalsPage />} />
      </Route>
    </Routes>
  )
}
