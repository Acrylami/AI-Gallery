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
    if(predictions.length >== 1){
      console.log('object detected');
    }else{
      console.log('no object detected');
      return;
    }
    let nameSet = new Set();
    for(let i = 0; i < predictions.length; i++){
      nameSet.add(predictions[i].class);
      if(nameSet.size > 1){
        return;
      }
    }
    const iterator = nameSet.values();
    const name = iterator.next().value;

    let options = {
      "method": "POST",
      "body": JSON.stringify({name}),
    	"headers": {
    		"content-type": "application/json",
      },
    };

    let response = await fetch('/server/translate',options);

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
