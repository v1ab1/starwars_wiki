import axios from "axios";
import { useEffect, useState } from 'react';
import style from "./Main.module.css";

export const Main = ({chapter, preview}) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  useEffect(() => {
    axios.get('https://swapi.dev/api/films/1')
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
      setErr(!err);
    });
  }, [err]);
  return (
    <div className={style.Main}>
      {data.length === 0 ? chapter : 
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
            {data.opening_crawl}
          </p>
        </div>
      </div>
      }
    </div>
  );
}