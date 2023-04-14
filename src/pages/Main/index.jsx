import axios from "axios";
import { useEffect, useState } from 'react';
import style from "./Main.module.css";
import { Scroll } from "./Scroll";
import loading from "./loading.gif";
import unknown from "./unknown.png";

export const Main = ({chapter, preview}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [charactersData, setCharactersData] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [starshipsData, setStarshipsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const imagesSpecies = [];
    const responseSpecies = [];
    const url = chapter > 3 ? chapter - 3 : chapter + 3;
    axios.get(`https://swapi.dev/api/films/${url}`)
    .then((res) => {
      setData(res.data);
      const characters = [...res.data.characters];
      const planets = [...res.data.planets];
      const species = [...res.data.species];
      const starships = [...res.data.starships];
      const vehicles = [...res.data.vehicles];
      return { characters, planets, species, starships, vehicles };
    })
    .then(({ characters, planets, species, starships, vehicles }) => {
      const charactersPromise = new Promise((resolve) => {
        Promise.all(characters.map(el => axios.get(`https://akabab.github.io/starwars-api/api/id/${el.slice(el.slice(0, -1).lastIndexOf("/") + 1, -1)}.json`)))
        .then(responseArr => {
          const updatedChrData = responseArr.map(response => [response.data.name, response.data.homeworld, response.data.wiki, response.data.image]);
          setCharactersData(updatedChrData);
        })
        .then(() => resolve());
      });
      const planetsPromise = new Promise((resolve) => {
        Promise.all(planets.map(el => axios.get(el)))
        .then(responseArr => {
          const updatedPlanetsData = responseArr.map(response => [response.data.name, response.data.climate, response.data.terrain, response.data.population]);
          setPlanetsData(updatedPlanetsData);
        })
        .then(() => resolve());
      });
      const starshipsPromise = new Promise((resolve) => {
        Promise.all(starships.map(el => axios.get(el)))
        .then(responseArr => {
          const updatedStarshipsData = responseArr.map(response => [response.data.name, response.data.model, response.data.manufacturer, response.data.cost_in_credits, response.data.length, response.data.max_atmosphering_speed, response.data.crew, response.data.passengers, response.data.cargo_capacity, response.data.consumables, response.data.hyperdrive_rating, response.data.MGLT, response.data.starship_class]);
          setStarshipsData(updatedStarshipsData);
        })
        .then(() => resolve());
      });
      const veniclesPromise = new Promise((resolve) => {
        Promise.all(vehicles.map(el => axios.get(el)))
        .then(responseArr => {
          const updatedVeniclesData = responseArr.map(response => [response.data.name, response.data.model, response.data.manufacturer, response.data.cost_in_credits, response.data.length, response.data.max_atmosphering_speed, response.data.crew, response.data.passengers, response.data.cargo_capacity, response.data.consumables, response.data.vehicle_class]);
          setVehiclesData(updatedVeniclesData);
        })
        .then(() => resolve());
      });
      const speciesPromise = new Promise((resolve) => {
        Promise.all(species.map(el => axios.get(el)))
        .then(responseArr => {
          responseSpecies.push(...responseArr);
          const promisesImages = responseArr.map(obj => {
            const id = obj.data.people[0].slice(obj.data.people[0].slice(0, -1).lastIndexOf("/") + 1, -1);
            return axios.get(`https://akabab.github.io/starwars-api/api/id/${id}.json`);
          });
          const first = Promise.all(promisesImages)
          .then(responses => {
            const imagesTemp = responses.map(response => response.data.image);
            console.log('first end');
            return imagesTemp;
          });
          first.then((imagesTemp) => {
            imagesSpecies.push(...imagesTemp);
            const updatedSpeciesData = responseSpecies.map((response, index) => [response.data.name, response.data.average_height, response.data.average_lifespan, imagesSpecies[index], response.data.language]);
            setSpeciesData(updatedSpeciesData);
            console.log('end');
            resolve();
          });
        });
      });
      Promise.all([charactersPromise, planetsPromise, starshipsPromise, veniclesPromise, speciesPromise])
      .then(() => {
        setLoading(false);
      });
    });
  }, []);

  //https://akabab.github.io/starwars-api/api/id/1.json

  return (
    <div className={style.Main}>
      {isLoading ? <img className={style.loading} src={loading} alt="loading" /> : 
      <div className={style.content}>
        <img className={style.preview} src={preview} alt="preview" />
        <div className={style.desc}>
          <h1 className={style.header}>
            {data.title}
          </h1>
          <p className={style.crawl}>
            Director: {data.director}
          </p>
          <p className={style.crawl}>
            Producers: {data.producer}
          </p>
          <p className={style.crawl}>
            Release date: {data.release_date.slice(-2)}.{data.release_date.slice(5,7)}.{data.release_date.slice(0, 4)}
          </p>
          <p className={style.crawl}>
            {data.opening_crawl}
          </p>
          <h2>
            Characters
          </h2>
          <div className={style.characters}>
            {/* <Arrow className={style.arrow} /> */}
            {charactersData.map((el, i) => (
              <div className={style.hero} key={i}>
                <div className={style.hero_img_wrapper}>
                  <img src={el[3] ? el[3] : unknown}    alt="character" ref={(img) => {
                    if (img) {
                      fetch(el[3])
                        .then((response) => {
                          if (!response.ok) {
                              img.src = unknown;
                          }
                        })
                        .catch((event) => {
                          event.preventDefault();
                          img.src = unknown;
                        });
                    }
                  }}/>
                </div>
                <div className={style.hero_text}>
                  <p>
                    Name: {el[0]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    Homeworld: {el[1]}
                  </p>
                  <a href={el[2]}>
                    Wiki: <span>click</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <h2>
            Planets
          </h2>
          <div className={style.characters}>
            {/* <Arrow className={style.arrow} /> */}
            {planetsData.map((el, i) => (
              <div className={style.hero} key={i}>
                <div className={style.hero_text}>
                  <p>
                    Name: {el[0]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    Climate: {el[1]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    terrain: {el[2]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    population: {el[3]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h2>
            Species
          </h2>
          <div className={style.characters}>
            {/* <Arrow className={style.arrow} /> */}
            {speciesData.map((el, i) => {console.log(el); return (
              <div className={style.hero} key={i}>
                <div className={style.hero_img_wrapper}>
                  <img src={el[3] ? el[3] : unknown}    alt="character" ref={(img) => {
                    if (img) {
                      fetch(el[3])
                        .then((response) => {
                          if (!response.ok) {
                              img.src = unknown;
                          }
                        })
                        .catch((event) => {
                          event.preventDefault();
                          img.src = unknown;
                        });
                    }
                  }}/>
                </div>
                <div className={style.hero_text}>
                  <p>
                    Name: {el[0]}
                  </p>
                  <p>
                    Average height: {el[1]}
                  </p>
                  <p>
                    Average lifespan: {el[2]}
                  </p>
                  {/* <p style={{textTransform: "capitalize"}}>
                    Homeworld: {el[3]}
                  </p> */}
                  <p>
                    Language: {el[4]}
                  </p>
                </div>
              </div>
            )})}
          </div>
          <h2>
            Starships
          </h2>
          <div className={style.characters}>
            {/* <Arrow className={style.arrow} /> */}
            {starshipsData.map((el, i) => (
              <div className={style.hero} key={i}>
                <div className={style.hero_venicles}>
                  <p>
                    Name: {el[0]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    Model: {el[1]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    Manufacturer: {el[2]}
                  </p>
                  <p>
                    Cost in credits: {el[3]}
                  </p>
                  <p>
                    Length: {el[4]}
                  </p>
                  <p>
                    Max atmosphering speed: {el[5]}
                  </p>
                  <p>
                    Crew: {el[6]}
                  </p>
                  <p>
                    Passengers: {el[7]}
                  </p>
                  <p>
                    Cargo capacity: {el[8]}
                  </p>
                  <p>
                    Consumables: {el[9]}
                  </p>
                  <p>
                    Hyperdrive rating: {el[10]}
                  </p>
                  <p>
                    MGLT: {el[11]}
                  </p>
                  <p>
                    Starship class: {el[12]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h2>
            Vehicles
          </h2>
          <div className={style.characters}>
            {/* <Arrow className={style.arrow} /> */}
            {vehiclesData.map((el, i) => (
              <div className={style.hero} key={i}>
                <div className={style.hero_venicles}>
                  <p>
                    Name: {el[0]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    Model: {el[1]}
                  </p>
                  <p style={{textTransform: "capitalize"}}>
                    Manufacturer: {el[2]}
                  </p>
                  <p>
                    Cost in credits: {el[3]}
                  </p>
                  <p>
                    Length: {el[4]}
                  </p>
                  <p>
                    Max atmosphering speed: {el[5]}
                  </p>
                  <p>
                    Crew: {el[6]}
                  </p>
                  <p>
                    Passengers: {el[7]}
                  </p>
                  <p>
                    Cargo capacity: {el[8]}
                  </p>
                  <p>
                    Consumables: {el[9]}
                  </p>
                  <p>
                    Vehicle class: {el[10]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      }
    </div>
  );
}