import React, { useEffect, useState } from 'react'
import { Button, Typography } from "@mui/material";
import './index.css'

const App = () => {
  const currentDate = new Date()
  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
      const data = await res.json()
      setWeatherData(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const [weatherData, setWeatherData] = useState()
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const month = months[currentDate.getMonth()]
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()
  const formattedDate = `${month} ${day},${year}`
  const [city, setCity] = useState("Ahmedabad")
  const api = "85c9b171882e33a6713b0129f8f4c1c1"

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className='w-screen h-screen flex justify-center items-center' >
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "22rem", height: "40rem", padding: "1rem", boxShadow: "5px 5px 45px #000,-5px -5px 50px #000", background: "linear-gradient(to bottom,rgb(0 3 52),rgb(21 162 255 / 58%))", borderRadius: "45px" }} >
        {
          weatherData && (
            <>
              <Typography fontSize={"25px"} color={"white"} marginTop={"3rem"} textTransform={"capitalize"} >{formattedDate}</Typography>
              <Typography fontSize={"55px"} color={"white"} margin={"1rem"} textTransform={"capitalize"} >{weatherData.name}</Typography>
              <Typography fontSize={"60px"} color={"white"} fontWeight={"700"} >{weatherData.main.temp}</Typography>
              <Typography textTransform={"capitalize"} fontSize={"20px"} color={"white"} fontWeight={"500"} margin={"2rem"} >{weatherData.weather[0].main}</Typography>
              <Typography fontSize={"20px"} color={"white"} >{`Wind:${weatherData.wind.deg}deg||||Speed:${weatherData.wind.speed}`}</Typography>
              <form style={{ width: "100%" }} >
                <input type='text' placeholder='Enter the city name' value={city} onChange={(e) => setCity(e.target.value)} style={{ marginTop: "1rem", fontFamily: "monospace", fontSize: "20px", color: "black", paddingInlineStart: "1rem", borderRadius: "20px", width: "100%", height: "50px",textTransform:"capitalize" }} />
                <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "center", margin: "1rem" }} >
                  <Button variant='contained' onClick={fetchData} >Search</Button>
                </div>
              </form>
            </>
          )
        }
      </div>
    </div>
  )
}

export default App