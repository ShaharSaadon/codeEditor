import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lobby } from './views/Lobby'
// import { CodeBlock } from './views/CodeBlock';
import './assets/styles/global.scss'
import { CodeBlock } from './views/CodeBlock';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Lobby />}
        />
        <Route
          path="/codeblock/:id"
          element={<CodeBlock />}
        />
      </Routes>
    </Router>
  )
}

export default App