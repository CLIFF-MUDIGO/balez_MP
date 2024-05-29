import { Button, Upload, message } from "antd";
import React from "react";
import { setLoader } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";

function Images({ selectedProduct, setShowProductForm, getData }) {
  const [file, setFile] = React.useState(null);
 const dispatch = useDispatch();
  const upload = () => {
    try{
        dispatch(setLoader(true));
        // Upload Image to cloudinary 
    }catch (error) {
        dispatch(setLoader(false));
        message.error(error.message);
    }
  };

  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
        }}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>
      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;
