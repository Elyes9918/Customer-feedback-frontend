import React, { useState } from "react";
import { Modal } from "reactstrap";

const ImageContainer = ({ img }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const handleImgLoad = e => {
    setImgWidth(e.target.naturalWidth);
    setImgHeight(e.target.naturalHeight);
  }


  return (
    <a
      className="gallery-image popup-image"
      onClick={(ev) => {
        ev.preventDefault();
        toggle();
      }}
      href="#gallery"
    >
      <img className="w-100 rounded-top" src={img} alt="" style={{height: '120px', width: '250px'}} />
      <Modal isOpen={open} toggle={toggle} 
      style={{ maxHeight: '80vh', maxWidth: '80vw', 
               width: imgWidth ? `${imgWidth}px` : 'auto',
               height: imgHeight ? `${imgHeight}px` : 'auto' }}>
        <button type="button" className="mfp-close" onClick={toggle}>
          ×
        </button>

        <img src={img} alt="" 
        style={{  width: 'auto', height: 'auto',objectFit: 'contain' }}
        onLoad={handleImgLoad} 
        />

      </Modal>
    </a>
  );
};

export default ImageContainer;
