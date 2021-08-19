const Score = ( props ) => {

  const { self, userName, totalms } = props;

  return (
    <li className={ self && 'self' }>
      { userName }: { totalms }
    </li>
  );
}

export default Score;