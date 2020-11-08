import React, {useState, useRef} from 'react';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import InputImage from './InputImage';
import UploadBtn from './UploadBtn';
import objectImg from '../images/objects.png';


function Translator(){
  let [input, setInput] = useState(objectImg);
  let imgRef = useRef(null);

  function handleImage(e) {
    if(!e.target.files[0]){
      return;
    }
    setInput(URL.createObjectURL(e.target.files[0]));
  }

  async function detectObjects(){
    if (input === objectImg) {
      alert('input an image');
      return;
    }
    const model = await cocoSsd.load();
    const predictions = await model.detect(imgRef.current);
    console.log(predictions);

  }
  const uploadText = 'Detect objects';

  return(
    <div style={{textAlign: 'center'}}>
      <InputImage imgRef={imgRef} input={input} handleImage={handleImage}/>
      <UploadBtn btnText={uploadText} handleUploadBtn={detectObjects}/>
    </div>
  )
}


export default Translator;
