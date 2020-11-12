import React from 'react';
import Card from './Card.js';

function CardList(){
  let list = ['Meme swapper','Object translator','Style transfer','Still under construction','Still under construction','Still under construction'];
  let mlFunctions = ['meme', 'translator', 'style', 'construction', 'construction','construction'];

  return (
    <div className='row row-cols-1 row-cols-lg-3 row-cols-md-2 app-container'>
      {list.map((item, index) => <div className='col mb-3' key={item+index}>
        <Card title={item} mlFunct={mlFunctions[index]}/>
      </div>)}

    </div>
  )
}

export default CardList;
