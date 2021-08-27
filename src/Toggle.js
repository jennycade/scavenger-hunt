import './Toggle.css';

const Toggle = ( props ) => {
  // destructure props
  const { on, label, turnOn, turnOff } = props;

  return (
    <div className="toggleContainer">
      <div
        className={ on ? 'toggle toggleOn' : 'toggle toggleOff' }
        onClick={ on ? turnOff : turnOn }
      >
        <div className="innerToggle"></div>
      </div>
      <label>{ label }</label>
    </div>
  );
}

export default Toggle;