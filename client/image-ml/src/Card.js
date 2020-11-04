import React from 'react';
import dramaImg from './images/drama.png';

function Card(){

  return(
    <div className='card-div'>
      <h1 className='card-title'>osas</h1>
      <img src={dramaImg} className='img-card'/>
    </div>
  )
}

export default Card;
