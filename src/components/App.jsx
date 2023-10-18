import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import Home from '../pages/Home';
import { connectionManager, socket } from '../socket';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../hooks';
import { Loader } from './Loader';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { SignUp } from '../pages/Signup';
import MyPolls from '../pages/MyPolls';
import { MyVotedPolls } from '../pages/MyVotedPolls';
import { PollResults } from '../pages/PollResults';
import { Poll } from '../pages/Poll';
import { NewPoll } from '../pages/NewPoll';
import DeleteQuestion from '../pages/DeleteQuestion';
import EditQuestion from '../pages/EditQuestion';
import SearchResults from '../pages/SearchResults';
import NavigationBar from './NavigationBar';

function PrivateRoute({ children }) {
  const auth = useAuthContext();
  if (auth.user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

function App() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  // Initialising socket connection
  connectionManager(socket).connect();

  // Checks if
  if (auth.error === 'Authentication Expired') {
    auth.logout();
    navigate('/login');
    return;
  }
  // Reseting Error Hook on App render
  auth.catchError(null);

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className='App'>
      <ToastContainer />

      <Routes>
      
        <Route index element={<Home />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <NavigationBar />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/mypolls'
          element={
            <PrivateRoute>
              <NavigationBar />
              <MyPolls />
            </PrivateRoute>
          }
        />
        <Route
          path='/myvotes'
          element={
            <PrivateRoute>
              <NavigationBar />
              <MyVotedPolls />
            </PrivateRoute>
          }
        />
        <Route
          path='/delete/:id'
          element={
            <PrivateRoute>
              <NavigationBar />
              <DeleteQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path='/edit/:id'
          element={
            <PrivateRoute>
              <NavigationBar />
              <EditQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path='/search-results'
          element={
            <PrivateRoute>
              <NavigationBar />
              <SearchResults />
            </PrivateRoute>
          }
        />
       
        <Route path='/poll/results/:id' element={<PrivateRoute>
          <NavigationBar/>
          <PollResults />
        </PrivateRoute>} />
        <Route path='/poll/:id' element={<Poll />} />
        <Route path='/poll/create-new' element={<NewPoll />} />

        <Route path='/poll/create-new' element={<NewPoll />} />
      </Routes>
    </div>
  );
}

export default App;
