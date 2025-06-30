import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import TaskList from './pages/TaskList';
import AddTasks from './pages/AddTasks';
import EditTask from './pages/EditTask';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddTasks />} />
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/edit/:id' element={<EditTask />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
