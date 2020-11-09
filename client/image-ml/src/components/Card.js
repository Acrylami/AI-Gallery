import React from 'react';
import {useHistory} from 'react-router-dom';
import memeImg from '../images/drama.png';
import constructionImg from '../images/construction.png';

function Card(props){
  let history = useHistory();
  let imgSrc;
  switch(props.mlFunct){
    case 'meme':
    imgSrc = memeImg;
    break;

    default:
    imgSrc = constructionImg;
  }

  function handleOnClick(){
    if(props.mlFunct === 'construction'){
      return;
    }
    history.push(`/image/${props.mlFunct}`);
  }

  return(
    <div className='card-div' onClick={handleOnClick}>
      <h1 className='card-title'>{props.title}</h1>
      <img src={imgSrc} className='img-card' alt={props.title}/>
    </div>
  )
}

export default Card;
