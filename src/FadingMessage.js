import { useState, useEffect } from 'react';

const FadingMessage = ( props ) => {
  const { delay, message, messageId } = props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, delay);
  }, [delay, messageId]);

  // TODO: Make the image re-display even if the message is the same. How? ::shrug::
  // maybe App has state variable `messages` that messages push onto when they're visible and pop off of when they're hidden. Then multiple messages can be displayed as well as the same one multiple times in a row.

  return (
    <p key={ messageId } className={ visible ? 'fading message' : 'hidden message' }>{ message }</p>
  );
}

export default FadingMessage;