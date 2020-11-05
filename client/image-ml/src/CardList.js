import React from 'react';
import Card from './Card.js';

function CardList(){
  let list = ['Meme swapper','second','third','fourth','fifth','sixth'];
  let mlFunctions = ['meme', 'style', 'style', 'style', 'style','style'];

  return (
    <div className='row row-cols-3 card-list'>
      {list.map((item, index) => <div className='col mb-3'>
        <Card title={item} mlFunct={mlFunctions[index]}/>
      </div>)}

    </div>
  )
}

export default CardList;
