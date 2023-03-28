import first from "../../previews/1.webp";
import second from "../../previews/2.webp";
import third from "../../previews/3.webp";
import fourth from "../../previews/4.webp";
import fifth from "../../previews/5.webp";
import sixth from "../../previews/6.webp";

export const Poster = ({path}) => {
    return (<img className="preview" src={path} alt="poster" />);
};

export const Menu = () => {
  const arr = [first, second, third, fourth, fifth, sixth];
  return (
    <div className="Menu">
      {arr.map((el, i) =>
        <a href={`${i+1}`}>
            <Poster path={el} key={i} />
        </a>
      )}
    </div>
  );
}
