import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppHeader } from './components/AppHeader'
import { CodeBlock } from './views/CodeBlock';
import { useCallback, useState } from 'react';
import { Lobby } from './views/Lobby'
import './assets/styles/global.scss'
import { AppFooter } from './components/AppFooter';

function App() {
  const [title, setTitle] = useState('Choose Code Block')

  const handleSetTitle = useCallback((newTitle) => {
    setTitle(newTitle);
  }, [title]);


  return (
    <section className='main-container'>
      <Router>

        <AppHeader title={title} />
        <Routes>
          <Route
            path="/"
            element={<Lobby setTitle={handleSetTitle} />}
          />
          <Route
            path="/codeblock/:id"
            element={<CodeBlock setTitle={handleSetTitle} />}
          />

        </Routes>
        <AppFooter />

      </Router>
    </section>
  )
}

export default App