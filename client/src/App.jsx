import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppHeader } from './components/AppHeader'
import { CodeBlock } from './views/CodeBlock';
import { useState } from 'react';
import { Lobby } from './views/Lobby'
import './assets/styles/global.scss'
import { AppFooter } from './components/AppFooter';

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
        <AppFooter />

      </Router>
    </section>
  )
}

export default App