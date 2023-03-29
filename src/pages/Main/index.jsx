import axios from "axios";
import { useEffect, useState } from 'react';
import style from "./Main.module.css";
import { Arrow } from "./arrow";
import unknown from "./unknown.png";

export const Main = ({chapter, preview}) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false)
  const [chrData, setChrData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = chapter > 3 ? chapter - 3 : chapter + 3;
    axios.get(`https://swapi.dev/api/films/${url}`)
    .then((res) => {
      setData(res.data);
      const characters = [...res.data.characters];
      Promise.all(characters.map(el => axios.get(`https://akabab.github.io/starwars-api/api/id/${el.slice(el.slice(0, -1).lastIndexOf("/") + 1, -1)}.json`)))
      .then(responseArr => {
        const updatedChrData = responseArr.map(response => [response.data.name, response.data.homeworld, response.data.wiki, response.data.image]);
        setChrData(updatedChrData);
        setLoading(false);
      });
    })
    .catch((error) => {
      console.log(error);
      setErr(!err);
    });
  }, [err]);

  //https://akabab.github.io/starwars-api/api/id/1.json

  return (
    <div className={style.Main}>
      {isLoading ? chapter : 
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
          <div className={style.characters}>
            {/* <Arrow className={style.arrow} /> */}
            {chrData.map((el, i) => (
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
                        .catch(() => {
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
                    homeworld: {el[1]}
                  </p>
                  <a href={el[2]}>
                    wiki
                  </a>
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