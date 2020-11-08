import React from 'react';
import CardList from './CardList';
import Heading from './Heading';
function Home(){
  const head = 'Welcome to the image playground';
  const subHead = 'were you can use machine learning to do lots of cool stuff with an image';

  return(
    <div>
      <Heading head={head} subHead={subHead}/>
      <CardList />
    </div>
  )
}


export default Home;
