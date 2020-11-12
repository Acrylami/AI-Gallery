import React from 'react';
import {useHistory} from 'react-router-dom';
import logoImg from '../images/logo.png';

function Heading(props){
  let history = useHistory();

  function toHome(){
    history.replace('/');
  }


  return(
    <div className='heading'>
      <img src={logoImg} alt='logo' className='logo' onClick={toHome}/>

      <h1>{props.head}</h1>
      <p>{props.subHead}</p>
    </div>
  )
}


export default Heading;
