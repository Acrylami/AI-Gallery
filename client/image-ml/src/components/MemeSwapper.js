import React, {useState, useRef} from 'react';
import InputImage from './InputImage';
import UploadBtn from './UploadBtn';
import inputImg from '../images/input.png';
import swapImg from '../images/swap.png';
import loadingImg from '../images/loading.png';

function MemeSwapper() {
  let [input, setInput] = useState(inputImg);
  let [imgBlob, setImgBlob] = useState(null);
  let [output, setOutput] = useState([swapImg, 'Your output image']);
  let imgRef = useRef(null);

  function handleImage(e) {
    if(!e.target.files[0]){
      return;
    }
    setImgBlob(e.target.files[0]);
    setInput(URL.createObjectURL(e.target.files[0]));
  }

  async function handleSwapBtn(e) {
    e.preventDefault();
    if (imgBlob === null) {
      alert('input an image');
      return;
    }
    setOutput([loadingImg, 'Hold on, your input image is been swapped']);
    imgRef.current.scrollIntoView({behavior: "smooth"});
    const data = new FormData();
    data.append('image', imgBlob, imgBlob.name);
    let options = {
        method: 'POST',
        body: data,
    };
    let response = await fetch('/server/upload', options);
    if(response){
      let resBlob = await response.blob();
      if(resBlob){
        setOutput([URL.createObjectURL(resBlob), 'Your swapped image']);
      }else{
        console.log('sorry, no image blob');
      }
    }else{
      console.log('sorry, got no image response');
    }
  }
  const uploadText = 'Initiate swapping';


  return (
    <div style={{textAlign: 'center'}}>
      <InputImage input={input} handleImage={handleImage}/>
      <UploadBtn btnText={uploadText} handleUploadBtn={handleSwapBtn}/>

      <h3>{output[1]}</h3>
      <img id = "output" ref={imgRef} src = {output[0]} alt = 'output' className = 'meme-img' />
    </div>
  )
}


export default MemeSwapper;
