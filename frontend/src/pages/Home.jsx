import React from 'react'
import { DealSection , GridComponent, ProductSection, FeedbackSection } from '../components'

function Home() {
  return (  
    <div className='bg-slate-200'>
        <GridComponent />
        <ProductSection />
        <DealSection />
        <ProductSection />
        <FeedbackSection />
    </div>
  )
}

export default Home