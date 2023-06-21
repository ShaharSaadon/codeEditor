import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lobby } from './views/Lobby'
import { AppHeader } from './components/AppHeader'
// import { CodeBlock } from './views/CodeBlock';
import './assets/styles/global.scss'
import { CodeBlock } from './views/CodeBlock';
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('Choose Code Block')
  return (
    <section className='main-container'>
      <Router>
        <AppHeader title={title} />
        <Routes>
          <Route
            path="/"
            element={<Lobby setTitle={setTitle} />}
          />
          <Route
            path="/codeblock/:id"
            element={<CodeBlock setTitle={setTitle} />}

          />
        </Routes>
      </Router>
    </section>
  )
}

export default App