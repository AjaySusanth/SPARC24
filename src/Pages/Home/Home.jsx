import About from "../About/About"
import AppFooter from "../Footer/Footer"
import Hero from "../Hero/Hero"
import Highlights from "../Highlights/Highlights"
import Memories from "../Memories/Memories"
import Navbar from "../Navbar/Navbar"
import Sessions from "../Sessions/Sessions"
import Sponsers from "../Sponsers/Sponsers"
import Tickets from "../Tickets/Tickets"

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <About/>
        <Tickets/>
        <Highlights/>
        <Memories/>
        <Sessions/>
        <Sponsers/>
        <AppFooter/>
    </div>
  )
}
export default Home