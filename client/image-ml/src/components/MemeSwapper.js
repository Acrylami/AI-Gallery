import React, {useState, useRef} from 'react';
import InputImage from './InputImage';
import UploadBtn from './UploadBtn';
import inputImg from '../images/input.png';
import swapImg from '../images/swap.png';
import loadingImg from '../images/loading.gif';

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
      let resText = await response.text();
      if(resText === 'not detected'){
        setOutput([swapImg, 'No face was detected in your input image, try another image']);

      }else{
        const newSrc = `data:image/png;base64,${resText}`;
        setOutput([newSrc, 'Your swapped image']);
      }
    }else{
      console.log('sorry, got no image response');
    }
  }
  const uploadText = 'Initiate swapping';


  return (
    <div>
      <InputImage input={input} handleImage={handleImage} imgText='input'/>
      <UploadBtn btnText={uploadText} handleUploadBtn={handleSwapBtn}/>

      <h3>{output[1]}</h3>
      <img id = "output" ref={imgRef} src = {output[0]} alt = 'output' className = 'app-img' />
    </div>
  )
}


export default MemeSwapper;
