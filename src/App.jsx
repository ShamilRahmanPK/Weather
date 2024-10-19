import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState({
    celcius: "0",
    name: "",
    humidity: "0",
    speed: "0",
    image: "",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  let [url, setUrl] = useState("./clouds.png");

  const handleClick = () => {
    if (name !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.weather[0].main.toLowerCase() === "Clouds") {
            setUrl("./clouds.png");
          } else if (result.weather[0].main === "Clear") {
            setUrl("./clear.png");
          } else if (result.weather[0].main === "Rain") {
            setUrl("./rain.png");
          } else if (result.weather[0].main === "Drizzle") {
            setUrl("./drizzle.png");
          } else if (result.weather[0].main === "Mist") {
            setUrl("./mist.png");
          } else {
            setUrl("./clouds.png");
          }
          console.log(url);
          
  
        
          setData({
            celcius: result.main.temp,
            name: result.name,
            humidity: result.main.humidity,
            speed: result.wind.speed,
            image: url,
          });
  
          setError(null); 
        })
        .catch((err) => {
          console.log(err);
          setError("Please enter a valid city name."); 
        });
    } else {
      setError("Please enter a city name."); 
    }
  };
  
  return (
    <div
      id="main"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url(/Background.png)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
      }}>

      <div
        style={{
          width: "480px",
          height: "480px",
          backgroundImage: "url(/temp.png)",
        }}
        className="flex flex-col items-center justify-between px-10 py-5"
      >
        <div className="flex justify-end">
          <div>
            <h3 style={{ fontSize: "45px", width: "100%" }}>{data.name}</h3>
          </div>
        </div>
        <div className="text-center">
          <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>
            {data.celcius}
            <sup>c</sup>
          </h1>
          <div className="text-center">
            <h3>
              Humidity : <span style={{fontWeight:600}}>{data.humidity}</span>%
            </h3>
            <h3>
              Wind Speed : <span style={{fontWeight:600}}>{data.speed}</span> Km/h
            </h3>
          </div>
        </div>
        <div className="">
          <img style={{ width: "100px" }} src={url} alt="Weather Icon" />
        </div>
        <div>
          <div
            className="inputarea"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px 15px",
                width: "250px",
                borderRadius: "25px",
                border: "2px solid #ccc",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                outline: "none",
                transition: "all 0.3s ease",
              }}
            />
            <button
              onClick={handleClick}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "25px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease",
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {error && (
            <p
              style={{
                color: "#ff4d4f",
                marginTop: "10px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
