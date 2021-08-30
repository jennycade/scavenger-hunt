import './StartScreen.css';

const StartScreen = ( props ) => {
  // props
  const { startGame } = props;

  return (
    <div className="startScreen">
      <p className="mobileOnly">WARNING: This game has not been designed to play on mobile devices (yet). Go find a laptop and play it there!</p>
      { props.children }
      <button onClick={ startGame }>Start the clock</button>
    </div>
  );
}

export default StartScreen;