import React from "react";
import Dropzone, { useDropzone, DropzoneOptions } from "react-dropzone";
import { Paper } from "@mui/material";

interface Field {
  name: string;
  placeholder?: string;
}

interface MyDropzoneProps {
  field: Field;
  onMediaDrop: DropzoneOptions['onDrop'];
  media?: string;
}

const MyDropzone: React.FC<MyDropzoneProps> = ({ onMediaDrop, media }) => {
  const { isDragActive } = useDropzone({
    onDrop: onMediaDrop
  });

  const dottedBox = {
    border: "1px dotted black",
    height: "300px",
    width: "300px"
  };

  return (
    <Dropzone onDrop={onMediaDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Paper style={dottedBox}>Drop the files here ...</Paper>
            ) : (
              <Paper style={dottedBox}>
                Drag and drop some files here, or click to select files
                {media && <img src={media} alt="Uploaded media" />}
              </Paper>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default MyDropzone;
