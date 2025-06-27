import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import TaskList from './pages/TaskList';
import AddTasks from './pages/AddTasks';
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/add' element={<AddTasks />} />
          <Route path='/edit/:id' element={<EditTask />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
