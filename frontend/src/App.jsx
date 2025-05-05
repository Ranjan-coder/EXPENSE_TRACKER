import { Routes , Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';


function App() {


  return (
    <>
  
    <Routes>
      <Route path='/' element={<Root/>} />
      <Route path='/Login' exact element={<Login />} />
      <Route path='/SignUp' exact element={<SignUp />} />
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/income' exact element={<Income />} />
      <Route path='/expense' exact element={<Expense />} />
    </Routes>
     
    </>
  )
}

export default App;


const Root = () => {
  // check if token exist in localstorage 
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if isAuthenticated, otherwise to login 
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login'/>
  );
}
