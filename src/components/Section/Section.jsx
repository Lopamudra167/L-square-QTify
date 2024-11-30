import styles from "./Section.module.css";
import { useEffect, useState } from "react";
import Cards from "../Card/Card";
import Carousel from "../Carousel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
//import { fetchGenre } from "../api";
function Section({ data, title,albums }) {
  const [pop,setPop]= useState([])
  const [jazz,setJazz]= useState([])
  const [blues,setBlues]= useState([])
  const [rock,setRock]= useState([])

  useEffect(() => {
    if (!albums && data && data.length > 0) {
      setPop(data.filter((item) => item.genre.label === "Pop"));
      setJazz(data.filter((item) => item.genre.label === "Jazz"));
      setBlues(data.filter((item) => item.genre.label === "Blues"));
      setRock(data.filter((item) => item.genre.label === "Rock"));
    }
  }, [data]);
 
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const[value,setValue] = useState("1")
    const handleChange =(event,newValue) => {
        setValue(newValue)
    }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
          <h3>{title}</h3>
          {albums && <button className={styles.button} onClick={handleToggle}>
            {toggle ? "Collapse All" : "Show All"}
          </button>}
      </div>
      {
        albums && data && data.length > 0 && (
          <div>
            {toggle ? (
              <div className={styles.wrapper}>
                {data.map((item) => {
                  return <Cards album={item} />;
                })}
              </div>
            ) : (
              <div className={styles.carousel}>
                <Carousel
                  data={data}
                  component={(data) => <Cards album={data} />}
                />
              </div>
            )}
          </div>
        )
      }
      
      {!albums &&  <Box sx={{width:"100%",typography:"body1",color:"white"}}>
            <TabContext value={value}>
                <Box sx={{borderBottom:1,borderColor:"divider"}}>
                    <TabList onChange={handleChange}
                    textColor="white"
                    indicatorColor="secondary"
                    backgroundColor="secondary">
                        <Tab label="All" value="1"/>
                        <Tab label="Rock" value="2"/>
                        <Tab label="Pop" value="3"/>
                        <Tab label="Jazz" value="4"/>
                        <Tab label="Blues" value="5"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                <div className={styles.carousel}>
                <Carousel
                  data={data}
                  component={(data) => <Cards album={data} songs/>}
                />
              </div>
                </TabPanel>
                <TabPanel value="2">
                <div className={styles.carousel}>
                <Carousel
                  data={rock}
                  component={(rock) => <Cards album={rock} songs/>}
                />
              </div>
                </TabPanel>
                <TabPanel value="3">
                <div className={styles.carousel}>
                <Carousel
                  data={pop}
                  component={(pop) => <Cards album={pop} songs/>}
                />
              </div>
                </TabPanel>
                <TabPanel value="4">
                <div className={styles.carousel}>
                <Carousel
                  data={jazz}
                  component={(jazz) => <Cards album={jazz} songs/>}
                />
              </div>
                </TabPanel>
                <TabPanel value="5">
                <div className={styles.carousel}>
                <Carousel
                  data={blues}
                  component={(blues) => <Cards album={blues} songs/>}
                />
              </div>
                </TabPanel>
            </TabContext>
        </Box> }
     
    </div>
  );
}
export default Section;
