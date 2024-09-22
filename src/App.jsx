import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
