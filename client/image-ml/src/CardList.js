import React from 'react';
import Card from './Card.js';

function CardList(){
  let list = ['Meme swapper','second','third','fourth','fifth','sixth'];

  return (
    <div className='row row-cols-3 card-list'>
      {list.map((item) => <div className='col mb-3'>
        <Card title={item}/>
      </div>)}

    </div>
  )
}

export default CardList;
