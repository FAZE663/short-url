import { useState , useEffect } from 'react'
import React from 'react'
import QRCode from "react-qr-code"
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
          const API_URL = import.meta.env.VITE_BACKEND_URL;
          const res = await fetch(`${API_URL}/shorten`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
          })
          const data = await res.json()
          console.log(data)
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
    <div className="hero-card">
      <h1>ShortURL</h1>
      <p className="subtitle">
        Transform long URLs into short, shareable links.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="url">Enter URL</label>

        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Generate Link"}
        </button>
      </form>
    </div>

    {output && (
      <section className="result-card">
        <h2>Your Short Link</h2>

        <div className="link-box">
          <a
            href={output}
            target="_blank"
            rel="noopener noreferrer"
          >
            {output}
          </a>

          <button
            onClick={() => navigator.clipboard.writeText(output)}
          >
            Copy
          </button>
        </div>
        <h3>QR Code</h3>
        <div className="qr-section">
          

          <div className="qr-container">
            <QRCode value={output} size={180} />
          </div>
        </div>
      </section>
    )}

    {history.length > 0 && (
      <section className="history-card">
        <h2>Recent Links</h2>

        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <div className="history-short">
                <a
                  href={item[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item[0]}
                </a>
              </div>

              <span className="arrow">→</span>

              <div className="history-original">
                {item[1]}
              </div>
            </li>
          ))}
        </ul>
      </section>
    )}
  </main>
)
}