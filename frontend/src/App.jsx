import React, { useState } from 'react'

export default function App() {
  const [url, setUrl] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setOutput('')
    try {
      const res = await fetch('http://127.0.0.1:8000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      setOutput(data.short_url || JSON.stringify(data))
    } catch (err) {
      setOutput('Error creating short link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <h1>Shorten a URL</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button type="submit" disabled={loading}>{loading ? 'Shortening…' : 'Shorten'}</button>
      </form>

      {output && (
        <div className="result">
          <strong>Result:</strong>
          <div>{output}</div>
        </div>
      )}
    </main>
  )
}
