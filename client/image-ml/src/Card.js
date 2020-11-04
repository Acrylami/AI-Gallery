import React from 'react';
import dramaImg from './images/drama.png';

function Card(props){

  return(
    <div className='card-div'>
      <h1 className='card-title'>{props.title}</h1>
      <img src={dramaImg} className='img-card' alt={props.title}/>
    </div>
  )
}

export default Card;
