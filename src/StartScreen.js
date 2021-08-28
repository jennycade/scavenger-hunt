import './StartScreen.css';

const StartScreen = ( props ) => {
  // props
  const { startGame } = props;

  return (
    <div className="startScreen">
      { props.children }
      <button onClick={ startGame }>Start the clock</button>
    </div>
  );
}

export default StartScreen;