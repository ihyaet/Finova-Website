import { Hero } from '@/components/sections/hero/Hero'
import { LogoBar } from '@/components/sections/LogoBar'
import { FeatureValue } from '@/components/sections/FeatureValue'
import { Integration } from '@/components/sections/Integration'
import { Numbers } from '@/components/sections/Numbers'
import { WhyFinova } from '@/components/sections/WhyFinova'
import { FAQ } from '@/components/sections/FAQ'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <FeatureValue />
      <Integration />
      <Numbers />
      <WhyFinova />
      <FAQ />
      <Testimonials />
      <CTA />
    </>
  )
}
