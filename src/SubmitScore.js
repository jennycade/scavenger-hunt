import { useState } from 'react';

const SubmitScore = ( props ) => {
  // props
  const { placeholder, submitUserName } = props;

  // state
  const [userName, setUserName] = useState(placeholder);

  // when input gets focus, if userName === placeholder, setUserName('')
  const clearPlaceholder = () => {
    if (userName === placeholder) {
      setUserName('');
    }
  }
  const restorePlaceholder = () => {
    if (userName === '') {
      setUserName(placeholder);
    }
  }

  // input
  const handleUserNameChange = (e) => {
    const newValue = e.target.value;
    setUserName(newValue);
  }

  // submit
  const submit = (e) => {
    e.preventDefault();
    submitUserName(userName);
  }

  return (
    <form className="submitScore" onSubmit={ submit }>
      <label>Submit your name to the high scores list</label>
      <input onFocus={ clearPlaceholder } onBlur={ restorePlaceholder } type='text' value={ userName } onChange={ handleUserNameChange } />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubmitScore;