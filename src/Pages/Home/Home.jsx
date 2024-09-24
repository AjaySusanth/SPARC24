import { useEffect, useState } from "react"
import { useAuth } from "../../libs/helper/AuthContext"
import About from "../About/About"
import AppFooter from "../Footer/Footer"
import Hero from "../Hero/Hero"
import Highlights from "../Highlights/Highlights"
import Memories from "../Memories/Memories"
import Navbar from "../Navbar/Navbar"
import Sessions from "../Sessions/Sessions"
import Sponsers from "../Sponsers/Sponsers"
import Tickets from "../Tickets/Tickets"
import './Home.css'
import Loader from "../../components/Loader/Loader"

const Home = () => {

  const {user,loading:authLoading} = useAuth()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    console.log(user)
    if(!authLoading)
      setLoading(false)
  },[authLoading])

  if (loading) return <Loader/>

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