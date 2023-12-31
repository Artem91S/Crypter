import { useState } from 'react';
import style from "./photoUploader.module.scss"
import { UploadFile } from '../Icons';
import Input from '../Input';
import { inputFields } from './inputFields';

export default function PhotoUploader({ isInAccount = false }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'images');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddggwaua5/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      // setImageUrl(data.secure_url)
      setImageUrl((prevUrls) => [...prevUrls, data.secure_url]);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className={style.uploader}>
      <div className={style.uploader__container}>
        <input
          type="file"
          onChange={handleFileChange}
          className={style.uploader__input}
          id='file' />
        <label
          htmlFor='file'
          className={style.uploader__label}>
          <UploadFile />
          <span className={style.uploader__text}>Choose file</span>
        </label>
        <button
          onClick={(event) => handleUpload(event)}
          disabled={!selectedFile}
          className={`${style.uploader__btn} ${isInAccount && style.uploader__btn_inAccount}`}>
          Upload
        </button>
      </div>
      {fileName && <p className={style.uploader__fileName}>{fileName}</p>}
      <Input
        key={inputFields.name}
        {...inputFields}
        value={imageUrl} />
      {showSuccessMessage && (
        <p className={`${style.uploader__successMessage} ${isInAccount && style.uploader__successMessage_inAccount}`}>
          Photo successfully uploaded!
        </p>)}
    </div>
  );
};


