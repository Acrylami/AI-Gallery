import React from 'react';
import {useHistory} from 'react-router-dom';
import dramaImg from './images/drama.png';

function Card(props){
  let history = useHistory();

  function handleOnClick(){
    history.push(`/image/${props.mlFunct}`);
  }

  return(
    <div className='card-div' onClick={handleOnClick}>
      <h1 className='card-title'>{props.title}</h1>
      <img src={dramaImg} className='img-card' alt={props.title}/>
    </div>
  )
}

export default Card;
