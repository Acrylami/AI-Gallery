import React, {useState, useRef} from 'react';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import InputImage from './InputImage';
import UploadBtn from './UploadBtn';
import objectImg from '../images/objects.png';
import loadingImg from '../images/loading.png';


function Translator(){
  let [input, setInput] = useState(objectImg);
  let [translate, setTranslate] = useState([]);
  let [detect, setDetect] = useState(['','hidden']);
  let [name, setName] = useState('');
  let imgRef = useRef(null);
  let loadingRef = useRef(null);

  function handleImage(e) {
    if(!e.target.files[0]){
      return;
    }
    setInput(URL.createObjectURL(e.target.files[0]));
  }

  async function detectObjects(){
    setDetect(['', 'hidden']);
    setTranslate([]);
    if (input === objectImg) {
      alert('input an image');
      return;
    }
    setDetect(['Detecting object in picture','visible']);
    loadingRef.current.scrollIntoView({behavior: "smooth"});
    const model = await cocoSsd.load();
    const predictions = await model.detect(imgRef.current);
    if(predictions.length >= 1){
      console.log('object detected');
    }else{
      setDetect(['No object detected, try uploading a different image', 'hidden'])
      return;
    }
    let nameSet = new Set();
    for(let i = 0; i < predictions.length; i++){
      nameSet.add(predictions[i].class);
      if(nameSet.size > 1){
        setDetect(['More than one object detected, try uploading an image with generally one object', 'hidden'])
        return;
      }
    }
    const iterator = nameSet.values();
    const value = iterator.next().value;
    setName(value);

    let options = {
      "method": "POST",
      "body": JSON.stringify({name: value}),
    	"headers": {
    		"content-type": "application/json",
      },
    };
    setDetect(['Translating object name to other languages', 'visible']);
    let response = await fetch('/server/translate',options);
    const resText = await response.json();
    setDetect(['Object translation is done', 'hidden']);
    setTranslate(resText);

  }
  const uploadText = 'Detect objects';

  return(
    <div style={{textAlign: 'center'}}>
      <InputImage imgRef={imgRef} input={input} handleImage={handleImage}/>
      <UploadBtn btnText={uploadText} handleUploadBtn={detectObjects}/>
      {detect[0].length > 0 && <h3>{detect[0]}</h3>}

      <img id = "output" ref={loadingRef} style={{
        visibility: detect[1], display: detect[0].length > 0 && translate.length > 0?
      'none' : 'block'}}
        src = {loadingImg} alt = 'output' className = 'meme-img' />
      {translate.length > 0 && <hr className='object-hr'/>}
      {translate.length > 0 && <p className='object-title'>Name of object detected is <b>{name}</b></p>}
      {translate.length > 0 && translate.map((item) => <p key={item[0]}>{item[0]} : {item[1]}</p>)}
    </div>
  )
}


export default Translator;
