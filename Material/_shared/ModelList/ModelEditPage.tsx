import React from "react";
import { Grid } from "@material-ui/core";
import ModelEdit from "../ModelEdit/ModelEdit";
import { RouteComponentProps } from "react-router-dom";

interface FormField {
  name: string;
  placeholder: string;
  type: string;
  value?: any;
  required?: boolean;
  options?: string[];
}

interface Model {
  _id: string;
  [key: string]: any; // Add more specific properties as needed
}

interface ModelEditPageProps extends RouteComponentProps {
  form: {
    fields: FormField[];
  };
  model: Model;
  modelSchema: any; // Define more specific types if necessary
  updateModel: (model: Model, values: any) => Promise<any>;
  onEditSubmit?: (model: Model) => void;
  modelName: string;
  media: any; // Define more specific types if necessary
  gallery: any; // Define more specific types if necessary
  uploadMedia: (id: string, files: File[]) => Promise<any>;
  uploadGallery: (id: string, files: File[]) => Promise<any>;
  addToGallery?: (id: string, media: any) => void;
  removeFromGallery?: (id: string, index: number) => void;
  addToMedia?: (id: string, media: any) => void;
  deleteMedia: (id: string, media: any) => Promise<void>;
  removeFromMedia?: (id: string, media: any) => void;
  notifications: any[]; // Define more specific types if necessary
  removeNotification: (notification: any) => void;
}

const ModelEditPage: React.FC<ModelEditPageProps> = ({
  form,
  model,
  modelSchema,
  updateModel,
  onEditSubmit,
  modelName,
  history,
  match,
  media,
  gallery,
  uploadMedia,
  uploadGallery,
  addToGallery,
  removeFromGallery,
  addToMedia,
  deleteMedia,
  removeFromMedia,
  notifications,
  removeNotification,
}) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <ModelEdit
          modelName={modelName}
          onCancel={() => {
            history.goBack();
          }}
          onSave={(updatedModel, values) => {
            updateModel(updatedModel, values).then((res) => {
              onEditSubmit && onEditSubmit(updatedModel);
            });
          }}
          form={form}
          modelSchema={modelSchema}
          model={model}
          media={media}
          gallery={gallery}
          uploadMedia={uploadMedia}
          uploadGallery={uploadGallery}
          addToGallery={addToGallery}
          removeFromGallery={removeFromGallery}
          addToMedia={addToMedia}
          deleteMedia={deleteMedia}
          removeFromMedia={removeFromMedia}
          onMediaUploadComplete={(model, media) => {
            updateModel(model, { image: `${media}&q=${Date.now()}` });
          }}
          onGalleryUploadComplete={(model, media) => {
            updateModel(model, { gallery: [...model.gallery, ...media] });
          }}
          onMediaDeleteComplete={(model, media) => {
            updateModel(model, { image: `` });
          }}
          onGalleryDeleteComplete={(model, index) => {
            const updatedGallery = [...model.gallery];
            updatedGallery.splice(index, 1);
            updateModel(model, { gallery: updatedGallery });
          }}
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </Grid>
    </Grid>
  );
};

export default ModelEditPage;
