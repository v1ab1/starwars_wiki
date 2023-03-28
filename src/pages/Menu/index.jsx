export const Poster = ({path}) => {
    return (<img className="preview" src={path} alt="poster" />);
};

export const Menu = ({paths}) => {
  return (
    <div className="Menu">
      {paths.map((el, i) =>
        <a href={`${i+1}`}>
            <Poster path={el} key={i} />
        </a>
      )}
    </div>
  );
}
