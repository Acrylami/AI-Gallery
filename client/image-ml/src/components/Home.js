import React from 'react';
import CardList from './CardList';
import Heading from './Heading';
function Home(){
  const head = 'Welcome to AI Gallery';
  const subHead = 'where you can use machine learning to do lots of cool stuff with an image';

  return(
    <div>
      <Heading head={head} subHead={subHead}/>
      <CardList />
    </div>
  )
}


export default Home;
