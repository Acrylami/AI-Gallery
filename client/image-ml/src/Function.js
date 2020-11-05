import React from 'react';
import {useParams} from 'react-router-dom';
import data from './data';
import Heading from './Heading';
import MemeSwapper from './MemeSwapper';


function Function(){
  let {feature} = useParams();
  let values = data[feature];

  return(
    <div>
      <Heading head={values.head} subHead={values.subHead}/>
      <div className='app-container'>
        <MemeSwapper />
      </div>

    </div>
  )
}


export default Function;
