import { Hero } from '@/components/home/Hero'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { FeaturedProfessionals } from '@/components/home/FeaturedProfessionals'
import { PublishCTA } from '@/components/home/PublishCTA'
import { BenefitsStrip } from '@/components/home/BenefitsStrip'
import { FloatingHelpBar } from '@/components/shared/FloatingHelpBar'

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <FeaturedProfessionals />
      <PublishCTA />
      <BenefitsStrip />
      <FloatingHelpBar />
    </>
  )
}
