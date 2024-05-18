import React from "react";
import { Grid } from "@mui/material";
import ModelPreview from "../ModelPreview/ModelPreview";
import Loading from "../Loading/Loading";

interface Model {
  _id: string;
  [key: string]: any;
}

interface ModelArray {
  data: Model[];
}

interface Notification {
  message: string;
  type: string;
}

interface ModelViewPageProps {
  modelArray: ModelArray;
  modelName: string;
  onEditWrapper: (model: Model) => void;
  onDeleteWrapper: (model: Model) => void;
  deleteModel: (model: Model) => Promise<void>;
  updateModel: (model: Model, values: any) => Promise<void>;
  searchModel: (query: any) => Promise<{ data: Model[] }>;
  form: any;
  classes: any;
  history: any; // Define a specific type if available
  location: any; // Define a specific type if available
  match: any; // Define a specific type if available
  ModelPreviewActions?: React.ComponentType<any>;
  ModelPreviewAction?: React.ComponentType<any>;
  ModelPreviewAttachment?: React.ComponentType<any>;
  notifications: Notification[];
  removeNotification: (notification: Notification) => void;
}

const ModelViewPage: React.FC<ModelViewPageProps> = ({
  modelArray,
  modelName,
  onEditWrapper,
  onDeleteWrapper,
  deleteModel,
  updateModel,
  searchModel,
  form,
  classes,
  history,
  location,
  match,
  ModelPreviewActions,
  ModelPreviewAction,
  ModelPreviewAttachment,
  notifications,
  removeNotification,
}) => {
  const model = modelArray.data.find(({ _id }) => _id === match.params.id);
  if (!model) {
    return <Loading />;
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <ModelPreview
          modelName={modelName}
          onEdit={onEditWrapper}
          onDelete={onDeleteWrapper}
          deleteModel={deleteModel}
          updateModel={updateModel}
          searchModel={searchModel}
          form={form}
          classes={classes}
          model={model}
          ModelPreviewActions={ModelPreviewActions}
          ModelPreviewAction={ModelPreviewAction}
          notifications={notifications}
          removeNotification={removeNotification}
        />
        {ModelPreviewAttachment && <ModelPreviewAttachment model={model} />}
      </Grid>
    </Grid>
  );
};

export default ModelViewPage;
