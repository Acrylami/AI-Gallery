import React from 'react';

function InputImage({input, handleImage, imgRef, imgText}){
  const id = imgText === 'input'? 'file':imgText;

  return(
    <div>
      <h3>Your {imgText} image</h3>
      <img ref={imgRef} id = "input" src = {input} alt = 'input' className = 'app-img' />
      <input type = "file" accept = "image/*" name = "image" id={id} style = {{display: 'none'}} onChange = {handleImage}/>
      <div className = 'upload-div'>
        <label htmlFor={id} className = 'btn btn-outline-primary upload-label'> Upload Image </label>
      </div>
    </div>
  )
}

export default InputImage;
