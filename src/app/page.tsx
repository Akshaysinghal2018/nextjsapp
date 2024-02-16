"use client"

import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function Home() {

  useEffect(() => {
    redirect("/products")
  }, [])

  return (
    <div className='home__container'>
      <div>Welcome Here!!!!</div>
    </div>
  )
}
