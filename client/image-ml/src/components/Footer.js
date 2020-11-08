import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Footer(){

  const arlyn = "https://github.com/Acrylami";
  const osas = "https://github.com/david-osas";
  const yashika = "https://github.com/yashika51";

  return(
    <footer className='footer'>
      <p className='footer-text'>Made with
        &nbsp;
        <FavoriteIcon className='heart'/>
        &nbsp;
        by
        <a href={osas} className='footer-link' target='_blank'> <em>Osas</em> </a>,
        <a href={yashika} className='footer-link' target='_blank'> <em>Yashika</em> </a>,
        <a href={arlyn} className='footer-link' target='_blank'> <em>Arlyn</em> </a>
      </p>
    </footer>
  )
}

export default Footer;
