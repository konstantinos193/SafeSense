'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Flag component with SSR disabled
const ReactWorldFlag = dynamic(() => import('react-world-flags'), { ssr: false })

interface FlagProps {
  code: string
  className?: string
  style?: React.CSSProperties
}

export function Flag({ code, className, style }: FlagProps) {
  const [error, setError] = React.useState(false)

  if (error) {
    return <span className={className} style={style}>{code.toUpperCase()}</span>
  }

  return (
    <ReactWorldFlag 
      code={code} 
      className={className}
      style={style}
      onError={() => setError(true)}
      fallback={<span className={className} style={style}>{code.toUpperCase()}</span>}
    />
  )
} 