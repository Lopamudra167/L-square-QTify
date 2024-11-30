import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Cards from "./components/Card/Card"
import { fetchTopAlbums, fetchNewAlbums, fetchSongsData } from "./components/api"
import { useState, useEffect } from "react" 
import styles from "./App.module.css";
import Section from "./components/Section/Section"
import Carousel from './components/Carousel';

function App() {
  const [topData,setTopData] = useState([])
  const [newData,setNewData] = useState([])
  const [songsData, setSongsData] = useState([]);
  const generateTopAlbumsData = async() => {
    try{
      const res = await fetchTopAlbums()
      setTopData(res)
      console.log(topData)
    }catch(err){
      console.log(err)
    }
  }
  const generateNewAlbumsData = async() => {
    try{
      const res = await fetchNewAlbums()
      setNewData(res)
      console.log(newData)
    }catch(err){
      console.log(err)
    }
  }
  const generateSongsData = async ()=> {
    try{
      const res = await fetchSongsData()
      setSongsData(res)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    generateTopAlbumsData();
    generateNewAlbumsData();
    generateSongsData();
  },[])
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className={styles.sectionWrapper}>
        <Section data={topData} title="Top Albums" albums/>
        <Section data={newData} title="New Albums" albums/>
        <Section data={songsData} title="Songs" />
      </div>
    </div>
  );
}

export default App;
