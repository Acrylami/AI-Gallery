import React, {useState, useRef} from 'react';
import InputImage from './InputImage';
import UploadBtn from './UploadBtn';
import contentImg from '../images/content.png';
import styleImg from '../images/style.png';
import transferImg from '../images/transfer.png';

function StyleTransfer(){
  let [content, setContent] = useState(contentImg);
  let [style, setStyle] = useState(styleImg);
  let [transfer, setTransfer] = useState(transferImg);
  let [contentBlob, setContentBlob] = useState(null);
  let [styleBlob, setStyleBlob] = useState(null);

  let transferRef = useRef(null);

  function handleContent(e) {
    if(!e.target.files[0]){
      return;
    }
    setContentBlob(e.target.files[0]);
    setContent(URL.createObjectURL(e.target.files[0]));
  }

  function handleStyle(e) {
    if(!e.target.files[0]){
      return;
    }
    setStyleBlob(e.target.files[0]);
    setStyle(URL.createObjectURL(e.target.files[0]));
  }

  function startStyleTransfer(){
    if(content === contentImg || style === styleImg){
      alert('please upload a content image and a style image');
      return;
    }
  }

  return(
    <div>
      <div className='row row-cols-1 row-cols-md-2'>
        <div className='col'>
          <InputImage input={content} handleImage={handleContent} imgText='content'/>
        </div>
        <div className='col'>
          <InputImage input={style} handleImage={handleStyle} imgText='style'/>
        </div>
      </div>
      <UploadBtn handleUploadBtn={startStyleTransfer} btnText='Start style transfer' />
      <h3>Your output image</h3>
      <img id = "output" ref={transferRef} src={transfer} alt='style transfer' className='app-img' />

    </div>
  )
}

export default StyleTransfer;
