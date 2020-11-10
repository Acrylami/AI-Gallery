import React from 'react';

function InputImage({input, handleImage, imgRef}){

  return(
    <div>
      <h3>Your input image</h3>
      <img ref={imgRef} id = "input" src = {input} alt = 'input' className = 'meme-img' />
      <input type = "file" accept = "image/*" name = "image" id = "file" style = {{display: 'none'}} onChange = {handleImage}/>
      <div className = 'upload-div'>
        <label htmlFor = "file" className = 'btn btn-outline-primary upload-label'> Upload Image </label>
      </div>
    </div>
  )
}

export default InputImage;
