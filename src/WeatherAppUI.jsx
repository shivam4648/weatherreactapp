
import React, { useEffect, useState } from "react";

const dateGenerator = ()=>{
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const fullDate = {
        weekDay: days[date.getDay()],
        month: months[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear()
    }
    return fullDate;
}

const WeatherAppUI = () => {
    const [city, setCity] = useState({});
    const [search, setSearch] = useState("Delhi");

    const fullDate = dateGenerator();
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;

    useEffect(()=>{
        const fetchApi = ()=>{
            fetch(url).then(response => response.json()).then(result => {
                setCity(result);
            })
        }
       fetchApi(); 
    },[search, url])

    // const enterSearch = (event)=>{
    //     if (event.key === "Enter") {
    //         fetch(url).then(response => response.json()).then(result => {
    //             setCity(result);
    //             setSearch("");
    //         })
    //     }
    // }

    const searchCity = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

    return (
        <>

            <div className="container">
                <div className="box">
                    <div className="searchBox">
                        <input type="search" autoComplete="off" className="searchBar" onChange={searchCity}  name="cityName" value={search} placeholder="Enter city..." />
                    </div>
                    {(typeof city.main != "undefined") ? (
                        <div>
                            <div className="cityDiv">
                            <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt="weather_Image"/>
                                <h1>{city.name}, {city.sys.country}</h1>
                            </div>
                            <div className="date">
                                <p>{fullDate.weekDay} {fullDate.day} {fullDate.month} {fullDate.year}</p>
                            </div>
                            <div className="tempDiv">
                                <h2>{Math.round(city.main.temp)} &#8451;</h2>
                            </div>
                            <div className="minMax">
                                <p>
                                    min : {Math.round(city.main.temp_min)} &#8451; | max : {Math.round(city.main.temp_max)} &#8451;
                                </p>
                            </div>
                        </div> 
                    ) : (
                        <p className="cityFoundErr">City not found!</p> 
                    )}

                </div>
            </div>

        </>
    );
}
export default WeatherAppUI;