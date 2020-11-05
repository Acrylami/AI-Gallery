import React, {useState} from 'react';


function MemeSwapper(){
  let [source, setSource] = useState(null);
  let [image, setImage] = useState({display: 'none'});
  let [imgBlob, setImgBlob] = useState(null);

  function handleImage(e){
    setImgBlob(e.target.files[0]);
    setSource(URL.createObjectURL(e.target.files[0]));
    setImage({display: 'block'});
  }

  async function handleSwapBtn(){
    if(source !== null){
      alert('input an image');
      return;
    }
    // const data = new FormData();
    // data.append('image', source, source.name);
    // let options = {
    //   method: 'POST',
    //   body: imgBlob,
    //   headers: {"Content-Type": "multipart/form-data"}
    // };
    // let response = await fetch('/server/upload',options);

  }

  return(
    <div>
      <img id="output" width="200" height='200' src={source} alt='user' style={image} className='meme-img'/>
      <input type="file"  accept="image/*" name="image" id="file" style={{display: 'none'}} onChange={handleImage}/>
      <div className='upload-div'><label htmlFor="file" className='btn btn-outline-primary upload-label'>Upload Image</label></div>

      <div className='upload-div'><button type='button' className='btn btn-primary' onClick={handleSwapBtn}>Initiate swapping</button></div>
    </div>


  )
}


export default MemeSwapper;
