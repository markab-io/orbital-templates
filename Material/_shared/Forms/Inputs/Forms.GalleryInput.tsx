import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "@mui/material";
// import ImageFileInput from "./Forms.ImageFileInput";

interface Field {
  name: string;
  placeholder: string;
}

interface GalleryInputProps {
  gallery: string[];
  field: Field;
  onMediaDelete: (image: string, index: number, isGallery: boolean) => void;
  setCurrentGalleryIndex: (index: number) => void;
  currentGalleryIndex: number;
  onGalleryDrop: (files: File[]) => void;
}

const GalleryInput: React.FC<GalleryInputProps> = ({
  gallery,
  field,
  onMediaDelete,
  setCurrentGalleryIndex,
  currentGalleryIndex,
  // onGalleryDrop,
}) => (
  <div>
    <h2>{field.placeholder}</h2>
    {/* FIX THIS */}
    {/* <ImageFileInput field={field} onMediaDrop={onGalleryDrop} media={} /> */}
    {gallery && gallery.length > 0 ? (
      <ImageGallery
        items={gallery.map((image) => ({
          original: image,
          thumbnail: image,
        }))}
        onSlide={(index) => {
          setCurrentGalleryIndex(index);
        }}
        renderCustomControls={() => (
          <Button
            className="image-gallery-custom-action"
            style={{ float: "right" }}
            onClick={() => {
              onMediaDelete(gallery[currentGalleryIndex], currentGalleryIndex, true);
            }}
          >
            Delete Image
          </Button>
        )}
      />
    ) : (
      ""
    )}
  </div>
);

export default GalleryInput;
