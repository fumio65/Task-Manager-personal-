import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Link to='/tasks' className='border rounded-xl p-6'>
      <h1 className="text-2xl font-bold text-gray-800">Welcome to Task Manager</h1>
      </Link>
    </div>
  );
};

export default Home;
