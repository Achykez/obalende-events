import React from 'react'
import KarokeHeader from './karoke-header'
import KarokeBody from './karoke-body'
const page = () => {
  return (
    <div style={{display:"flex", flexDirection:"column",gap:'40px'}}>
      <KarokeHeader/>
      <KarokeBody/>
    </div>
  )
}

export default page