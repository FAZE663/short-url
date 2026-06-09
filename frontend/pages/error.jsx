import { useSearchParams } from 'react-router-dom'
import React from 'react'

export default function ErrorPage() {
  const [params] = useSearchParams()

  const reason = params.get('reason')

  return (
    <div>
      <h1>
        {reason === 'expired'
          ? 'Link Expired'
          : 'Link Not Found'}
      </h1>
    </div>
  )
}