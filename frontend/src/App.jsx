import {useState} from 'react'

import "./index.css"

function App(){
  const[question,setQuestion] = useState("")
  const[answer,setAnswer] = useState("")
  const [sources,setSources] = useState([])
  const [isUnsafe, setIsUnsafe] = useState(false)
  const [loading,setLoading] = useState(false)
  

  const askQuestion = async() => {
    if(!question.trim()) return
    setLoading(true)
  
  try {
    const res = await fetch("https://ask-me-about-yoga-rag.onrender.com/ask", {
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ question }), 
  })
  const data = await res.json()
  setAnswer(data.answer || "No answer received.")
  setSources(data.sources || [])
  setIsUnsafe(!!data.isUnsafe)

}catch (err) { 
setAnswer("Something went wrong. Please try again.")
} 
  setLoading(false)
  }

  const handleReset = () => {
    setQuestion("")
    setAnswer("")
    setSources([])
    setIsUnsafe(false)
  }


return (
  <div className='container'>
    <header>
    <h1>Ask Me Anything About Yoga</h1>
    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
      Your personal AI wellness guide, grounded in ancient wisdom.
    </p>
    </header>

    <div className="input-section">
    <textarea
    value={question}
    placeholder="Ask anything about yoga..."
    onChange={(e) => setQuestion(e.target.value)}
    />
    <div className="button-group">
      <button className="btn-primary" onClick={askQuestion} disabled={loading}>
        {loading ? "Thinking..." : "Ask Guidance"}
      </button>
      {(question || answer || sources.length > 0) && (
        <button className="btn-secondary" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
    </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}>
          <p style={{ fontStyle: 'italic', color: 'var(--primary-color)' }}>Consulting the texts...</p>
        </div>
      )}

      {!loading && (isUnsafe || answer) && (
        <div className={`result-card ${isUnsafe ? 'warning-block' : ''}`}>
          <h3>{isUnsafe ? "Safety Notice" : "Answer"}</h3>
          <p>{answer}</p>


      {sources.length > 0 && (
            <div className="sources-section">
              <h4>Sources Reviewed</h4>
              <ul className="sources-list">
                {sources.map((src, i) => (
                  <li key={i} className="source-chip">{src}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
