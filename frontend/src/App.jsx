import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import TaskList from './pages/TaskList'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/tasks' element={<TaskList />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
