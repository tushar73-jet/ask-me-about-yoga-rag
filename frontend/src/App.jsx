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


return (
  <div className='container'>
    <h1>Ask Me Anything About Yoga</h1>
    <textarea
    value={question}
    placeholder="Ask anything about yoga..."
    onChange={(e) => setQuestion(e.target.value)}
    />
    <button onClick={askQuestion}>
      {loading ? "Thinking..." : "Ask"}
    </button>

      {isUnsafe ? (
        <div className='warning-block'>
          <h3>Safety Notice</h3>
        <p>{answer}</p>
        </div>

      ):answer ? (
        <div className='answer'>
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      ):null}

      {sources.length>0?(
        <div className='sources'>
          <h4>Sources</h4>
          <ul>
            {sources.map((src,i)=>(
              <li key={i}>{src}</li>
            ))}
          </ul>
          </div>
      ):null}
</div>
)

}
export default App;