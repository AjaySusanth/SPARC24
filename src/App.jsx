import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/signup'
import Registration from './Pages/Registration/Registration'
import { AuthProvider } from './libs/helper/AuthContext'
import Login from './Pages/Login/LoginModal'
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App