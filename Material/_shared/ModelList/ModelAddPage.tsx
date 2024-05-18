import React from "react";
import { Grid } from "@material-ui/core";
import ModelAdd from "../ModelAdd/ModelAdd";
import { RouteComponentProps } from "react-router-dom";

interface FormField {
  name: string;
  placeholder: string;
  type: string;
  value?: unknown;
  required?: boolean;
  options?: string[];
}

interface ModelAddPageProps extends RouteComponentProps {
  form: {
    fields: FormField[];
  };
  modelSchema: unknown; // Define more specific types if necessary
  createModel: (values: unknown, callback: (model: any) => void) => void;
  onCreateSubmit?: (model: any) => void;
  modelName: string;
  notifications: any[]; // Define more specific types if necessary
  removeNotification: (notification: any) => void;
}

const ModelAddPage: React.FC<ModelAddPageProps> = ({
  form,
  modelSchema,
  createModel,
  onCreateSubmit,
  modelName,
  history,
  location,
  match,
  notifications,
  removeNotification,
}) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <ModelAdd
          form={form}
          modelSchema={modelSchema}
          onSave={(values) => {
            createModel(values, (model) => {
              console.log("MODEL", model);
              onCreateSubmit
                ? onCreateSubmit(model)
                : history.push(`${match.path}/view/${model._id}`);
            });
          }}
          onCancel={() => {
            history.goBack();
          }}
          modelName={modelName}
          location={location}
          match={match}
          history={history}
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </Grid>
    </Grid>
  );
};

export default ModelAddPage;
