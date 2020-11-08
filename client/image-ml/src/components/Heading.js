import React from 'react';

function Heading(props){

  return(
    <div className='heading'>
      <h1>{props.head}</h1>
      <p>{props.subHead}</p>
    </div>
  )
}


export default Heading;
