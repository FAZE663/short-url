import { useState , useEffect } from 'react'
import React from 'react'
import './App.css'

export default function Home() {
    const [history, setHistory] = useState([])
      const [url, setUrl] = useState('')
      const [output, setOutput] = useState('')
      const [loading, setLoading] = useState(false)
    
      useEffect(()=>{
        const saved = JSON.parse(
          localStorage.getItem('shortHistory') || '[]'
        )
    
        setHistory(saved)
      },[])
    
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
          const shortUrl = data.short_url || JSON.stringify(data)
          setOutput(shortUrl)
          const updatedHistory = [
            [
              shortUrl, url
          ],
            ...history
          ].slice(0, 10)
          setHistory(updatedHistory)
    
          localStorage.setItem(
            'shortHistory',
            JSON.stringify(updatedHistory)
          )
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
            <div>
              <a href={output} target="_blank" rel="noopener noreferrer">
                {output}
              </a>
            </div>
            <div><button onClick={() => navigator.clipboard.writeText(output)}>
                Copy
              </button></div>
          </div>
        )}
    
          {history.length > 0 && (
          <div className="history">
            <h2>Recent URLs</h2>
    
            <ul>
              {history.map((item, index) => (
                <li key={index} className="history-item">
                  <a
                    href={item[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-url"
                  >
                    {item[0]}
                  </a>
    
                  <span>→</span>
    
                  <span className="original-url">
                    {item[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        </main>
      )
}