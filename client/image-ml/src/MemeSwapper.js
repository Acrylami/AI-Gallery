import React, {useState} from 'react';


function MemeSwapper() {
    let [input, setInput] = useState(null);
    let [image, setImage] = useState({display: 'none'});
    let [imgBlob, setImgBlob] = useState(null);
    let [output, setOutput] = useState(null);

    function handleImage(e) {
      if(!e.target.files[0]){
        return;
      }
        setImgBlob(e.target.files[0]);
        setInput(URL.createObjectURL(e.target.files[0]));
        setImage({display: 'block'});
    }

    async function handleSwapBtn(e) {
      e.preventDefault();
        if (input === null) {
            alert('input an image');
            return;
        }
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
            console.log(resBlob);
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
        <img id = "input" width = "200" height = '200' src = {input} alt = 'input' style = {image} className = 'meme-img' />
        <input type = "file" accept = "image/*" name = "image" id = "file" style = {{display: 'none'}} onChange = {handleImage}/>
        <div className = 'upload-div'>
          <label htmlFor = "file" className = 'btn btn-outline-primary upload-label'> Upload Image </label>
        </div>

        <div className = 'upload-div'>
          <button type = 'button' className = 'btn btn-primary' onClick = {handleSwapBtn}> Initiate swapping </button>
        </div>

        {output !== null &&
          <img id = "output" width = "200" height = '200' src = {output} alt = 'output' style = {image} className = 'meme-img' />}
      </div>
    )
}


export default MemeSwapper;
