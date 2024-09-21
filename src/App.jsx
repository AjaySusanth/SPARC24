import './App.css'
import Navbar from './Pages/Navbar/Navbar';
import Hero from './Pages/Hero/Hero';
import About from './Pages/About/About';
import Tickets from './Pages/Tickets/Tickets';
import Highlights from './Pages/Highlights/Highlights';
import Memories from './Pages/Memories/Memories';
import Timeline from './Pages/Timeline/Timeline';
import Sessions from './Pages/Sessions/Sessions';
import Sponsers from './Pages/Sponsers/Sponsers';
import Footer from './Pages/Footer/Footer'

function App() {
  

  return (
    <>
      <div>
        <Navbar/>
        <Hero/>
        <About/>
        <Tickets/>
        <Highlights/>
        <Memories/>
        <Sessions/>
        <Sponsers/>
        <Footer/>
      </div>
      
    </>
  )
}

export default App
