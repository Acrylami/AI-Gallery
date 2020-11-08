import React from 'react';


function UploadBtn({handleUploadBtn, btnText}){

  return(
    <div className = 'upload-div'>
      <button type = 'button' className = 'btn btn-primary' onClick = {handleUploadBtn}>
        {btnText}
      </button>
    </div>
  )
}

export default UploadBtn;
