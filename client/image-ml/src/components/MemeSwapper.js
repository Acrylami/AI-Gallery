import React, {useState, useRef} from 'react';
import inputImg from '../images/input.png';
import swapImg from '../images/swap.png';
import loadingImg from '../images/loading.png';

function MemeSwapper() {
    let [input, setInput] = useState(inputImg);
    let [imgBlob, setImgBlob] = useState(null);
    let [output, setOutput] = useState(swapImg);
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
        if (input === null) {
            alert('input an image');
            return;
        }
        setOutput(loadingImg);
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
            setOutput(URL.createObjectURL(resBlob));
          }else{
            console.log('sorry, no image blob');
          }
        }else{
          console.log('sorry, got no image response');
        }
    }

    return (
      <div>
        <img id = "input" src = {input} alt = 'input' className = 'meme-img' />
        <input type = "file" accept = "image/*" name = "image" id = "file" style = {{display: 'none'}} onChange = {handleImage}/>
        <div className = 'upload-div'>
          <label htmlFor = "file" className = 'btn btn-outline-primary upload-label'> Upload Image </label>
        </div>

        <div className = 'upload-div'>
          <button type = 'button' className = 'btn btn-primary' onClick = {handleSwapBtn}>
             Initiate swapping
          </button>
        </div>

        <img id = "output" ref={imgRef} src = {output} alt = 'output' className = 'meme-img' />
      </div>
    )
}


export default MemeSwapper;
