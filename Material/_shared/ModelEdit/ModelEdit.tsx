import React, { useEffect } from "react";
import { Formik } from "formik";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Icon,
} from "@material-ui/core";
import Forms from "../Forms/Forms";
import FormsValidate from "../Forms/Forms.Validate";
import Loading from "../Loading/Loading";
import ClientNotification from "../ClientNotification/ClientNotification";

interface ModelEditProps {
  model: any; // Define more specific types if possible
  modelSchema: any; // Define more specific types if possible
  onSave: (model: any, values: any) => void;
  onCancel: () => void;
  onSelect: (fieldName: string, value: any) => void;
  form: any; // Define more specific types if possible
  uploadMedia: (modelId: string, files: File[]) => Promise<any>;
  deleteMedia: (modelId: string, media: any) => Promise<void>;
  onMediaUploadComplete: (model: any, media: any) => void;
  onGalleryUploadComplete: (model: any, gallery: any) => void;
  onMediaDeleteComplete: (model: any, media: any) => void;
  onGalleryDeleteComplete: (model: any, media: any, index: number) => void;
  uploadGallery: (modelId: string, files: File[]) => Promise<any>;
  gallery: any; // Define more specific types if possible
  media: any; // Define more specific types if possible
  notifications: any[]; // Define more specific types if possible
  removeNotification: (notification: any) => void;
  classes?: {
    editContent?: string;
  };
  [key: string]: any;
}

const ModelEdit: React.FC<ModelEditProps> = ({
  model,
  modelSchema,
  onSave,
  onCancel,
  onSelect,
  form,
  uploadMedia,
  deleteMedia,
  onMediaUploadComplete,
  onGalleryUploadComplete,
  onMediaDeleteComplete,
  onGalleryDeleteComplete,
  uploadGallery,
  gallery,
  media,
  notifications,
  removeNotification,
  classes,
  ...rest
}) => {
  useEffect(() => {
    // ComponentDidMount logic can be placed here if needed
    // ComponentWillReceiveProps logic can be handled by the `useEffect` dependency array
  }, [model]);

  return !!model ? (
    <Formik
      onSubmit={(values) => {
        onSave(model, values);
      }}
      initialValues={model}
      enableReinitialize={true}
      validate={(values) => {
        const errors = FormsValidate(values, form, modelSchema);
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Card className={classes?.editContent}>
          <CardHeader title={model?.title} />
          <CardContent>
            <form id="edit-form">
              <Forms
                id="edit-fields"
                form={form}
                errors={errors}
                modelSchema={modelSchema}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                values={values}
                touched={touched}
                media={model?.image}
                tempMedia={media}
                gallery={model?.gallery}
                tempGallery={gallery}
                isSubmitting={isSubmitting}
                onMediaDrop={(acceptedFiles) => {
                  uploadMedia(model._id, acceptedFiles).then((res) => {
                    onMediaUploadComplete(model, res.data);
                  });
                }}
                onGalleryDrop={(acceptedFiles) => {
                  uploadGallery(model._id, acceptedFiles).then((res) => {
                    onGalleryUploadComplete(model, res.data);
                  });
                }}
                onMediaDelete={(image, index, isMultiple) => {
                  deleteMedia(model._id, image).then(() => {
                    if (isMultiple) {
                      onGalleryDeleteComplete(model, image, index);
                    }
                    onMediaDeleteComplete(model, image);
                  });
                }}
                onSelect={onSelect}
                {...rest}
              />
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <Icon>save</Icon>
              <span style={{ marginLeft: "5px" }}>Save</span>
            </Button>
          </CardActions>
          <ClientNotification
            notifications={notifications}
            handleClose={(event, reason, notification) => {
              removeNotification(notification);
            }}
          />
        </Card>
      )}
    </Formik>
  ) : (
    <Loading />
  );
};

export default ModelEdit;
