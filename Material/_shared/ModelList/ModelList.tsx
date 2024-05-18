import React, { useState } from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import {
  Grid,
  Button,
  Paper,
  Backdrop,
  useMediaQuery,
} from "@mui/material";
import { styles } from "./ModelList.styles";
import ModelListItems from "./ModelListItems";
import ModelFilterList from "./ModelFilterList";
import Pagination from "../Pagination/Pagination";
import Autocomplete from "../Autocomplete/Autocomplete";
import FloatingAddButton from "../FloatingAddButton/FloatingAddButton";
import ClientNotification from "../ClientNotification/ClientNotification";
import Loading from "../Loading/Loading";
import ModelAddPage from "./ModelAddPage";
import ModelEditPage from "./ModelEditPage";
import ModelViewPage from "./ModelViewPage";
import { makeStyles } from '@mui/styles';

interface Model {
  _id: string;
  [key: string]: unknown;
}

interface ModelArray {
  data: Model[];
  count: number;
}

interface FormField {
  name: string;
  type: string;
}

interface Form {
  fields: FormField[];
}

interface Notification {
  message: string;
  type: string;
}

interface ModelListProps {
  modelArray: ModelArray;
  modelSchema: any; // Add a specific type if available
  createModel: (values: any, callback: (model: Model) => void) => void;
  modelName: string;
  updateModel: (model: Model, values: any) => Promise<void>;
  deleteModel: (model: Model) => void;
  searchModel: (query: any) => Promise<{ data: Model[] }>;
  uploadMedia: (id: string, files: File[]) => Promise<{ data: any }>;
  setFilter?: (filter: any) => void;
  removeFilter?: (filter: any) => void;
  modelCount?: (args: any, callback: any, fieldName: string) => Promise<any>;
  loading: boolean;
  gallery: any[];
  uploadGallery: (id: string, files: File[]) => Promise<{ data: any }>;
  addToGallery?: (gallery: any) => void;
  removeFromGallery?: (gallery: any) => void;
  addToMedia?: (media: any) => void;
  removeFromMedia?: (media: any) => void;
  deleteMedia: (id: string, media: any) => Promise<void>;
  media: any[];
  match: any; // Define a specific type if available
  history: any; // Define a specific type if available
  location: any; // Define a specific type if available
  form: Form;
  notifications: Notification[];
  saveNotification?: (notification: Notification) => void;
  removeNotification: (notification: Notification) => void;
  ModelPreviewActions?: React.ComponentType<any>;
  ModelPreviewAction?: React.ComponentType<any>;
  ModelPreviewAttachment?: React.ComponentType<any>;
  modelKey?: string;
  columnNumber?: number;
  onSearch?: (query: any) => Promise<Model[]>;
  onSearchSelect?: (suggestion: Model) => void;
  page?: number;
  rowsPerPage?: number;
  setPage?: (page: number) => void;
  setRowsPerPage?: (rowsPerPage: number) => void;
  ModelListActions?: React.ComponentType<any>;
  ModelListItemComponent?: React.ComponentType<any>;
  noPagination?: boolean;
  onChangePage?: (page: number) => void;
  onAdd?: () => void;
  onAddText?: string;
  onDelete?: (model: Model) => void;
  onEdit?: (model: Model) => void;
  onEditSubmit?: (model: Model) => void;
  onCreate?: (model: Model) => void;
  onCreateSubmit?: (model: Model) => void;
  onView?: (model: Model) => void;
  justify?: "flex-start" | "center" | "flex-end";
  disableViewPage?: boolean;
  disableEditPage?: boolean;
  enableSearch?: boolean;
  gridSizes?: any; // Define a specific type if available
  defaultView?: React.ReactNode;
}

const useStyles = makeStyles(styles);

const ModelList: React.FC<ModelListProps> = ({
  modelArray,
  modelSchema,
  createModel,
  modelName,
  updateModel,
  deleteModel,
  searchModel,
  uploadMedia,
  modelCount,
  loading,
  gallery,
  uploadGallery,
  addToGallery,
  removeFromGallery,
  addToMedia,
  removeFromMedia,
  deleteMedia,
  media,
  match,
  history,
  location,
  form,
  notifications,
  removeNotification,
  ModelPreviewActions,
  ModelPreviewAction,
  ModelPreviewAttachment,
  modelKey,
  columnNumber,
  onSearch,
  onSearchSelect,
  page,
  ModelListActions,
  ModelListItemComponent,
  noPagination,
  onChangePage,
  onAdd,
  onAddText,
  onDelete,
  onEdit,
  onEditSubmit,
  onCreate,
  onCreateSubmit,
  onView,
  justify,
  disableViewPage,
  disableEditPage,
  enableSearch,
  gridSizes,
  defaultView,
}) => {
  const classes = useStyles();
  const [viewOption] = useState<number>(0);

  const onEditWrapper = (model: Model) => {
    if (onEdit) {
      return onEdit(model);
    }
    history.push(`${match.path}/edit/${model._id}`);
  };

  const onDeleteWrapper = (model: Model) => {
    if (onDelete) {
      return onDelete(model);
    }
    history.push(`${match.path}`);
  };

  const onAddWrapper = () => {
    if (onAdd) {
      return onAdd();
    }
    history.push(`${match.path}/add`);
  };

  const onCreateWrapper = (model: Model) => {
    if (onCreate) {
      return onCreate(model);
    }
    model && onViewWrapper(model);
  };

  const onViewWrapper = (model: Model) => {
    if (onView) {
      return onView(model);
    }
    history.push(`${match.path}/view/${model._id}`);
  };

  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const Actions = {
    onEdit: onEditWrapper,
    onDelete: onDeleteWrapper,
    onCreate: onCreateWrapper,
    onView: onViewWrapper,
    onAdd: onAddWrapper,
  };

  const models = modelArray.data;

  return (
    <Router>
      <Switch>
        <Route
          path={`${match.path}add`}
          render={(props) => (
            <ModelAddPage
              {...props}
              form={form}
              modelSchema={modelSchema}
              createModel={createModel}
              onCreateSubmit={onCreateSubmit}
              modelName={modelName}
              history={history}
              location={location}
              notifications={notifications}
              removeNotification={removeNotification}
            />
          )}
        />
        {!disableEditPage && (
          <Route
            path={`${match.path}edit/:id`}
            render={(props) => (
              <ModelEditPage
                {...props}
                form={form}
                modelSchema={modelSchema}
                updateModel={updateModel}
                onEditSubmit={onEditSubmit}
                modelName={modelName}
                history={history}
                location={location}
                match={match}
                media={media}
                gallery={gallery}
                uploadMedia={uploadMedia}
                uploadGallery={uploadGallery}
                addToGallery={addToGallery}
                removeFromGallery={removeFromGallery}
                addToMedia={addToMedia}
                deleteMedia={deleteMedia}
                removeFromMedia={removeFromMedia}
                notifications={notifications}
                removeNotification={removeNotification}
              />
            )}
          />
        )}
        {!disableViewPage && (
          <Route
            path={`${match.path}view/:id`}
            render={(props) => (
              <ModelViewPage
                {...props}
                modelArray={modelArray}
                modelName={modelName}
                onEditWrapper={onEditWrapper}
                onDeleteWrapper={onDeleteWrapper}
                deleteModel={deleteModel}
                updateModel={updateModel}
                searchModel={searchModel}
                form={form}
                classes={classes}
                history={history}
                location={location}
                match={match}
                ModelPreviewActions={ModelPreviewActions}
                ModelPreviewAction={ModelPreviewAction}
                ModelPreviewAttachment={ModelPreviewAttachment}
                notifications={notifications}
                removeNotification={removeNotification}
              />
            )}
          />
        )}
        <Route
          path={`${match.path}`}
          render={() => (
            <>
              <Backdrop
                style={{
                  zIndex: 99,
                  color: "#fff",
                }}
                open={loading}
              >
                <Loading />
              </Backdrop>
              {enableSearch && (
                <Grid style={{ marginBottom: "1em" }} container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Paper
                      style={{ padding: "1em", borderRadius: "50px" }}
                      className={classes.autocompleteContainer}
                    >
                      <Autocomplete
                        inputClassName={classes.autocomplete}
                        placeholder={"Search…"}
                        onSelect={(suggestion) => {
                          onSearchSelect || disableViewPage
                            ? onSearchSelect?.(suggestion)
                            : history.push(`${match.path}/view/${suggestion._id}`);
                        }}
                        loadSuggestions={(text) => {
                          const query = {
                            [modelKey as string]: { $regex: text },
                          };
                          if (onSearch) {
                            return onSearch(query);
                          }
                          return new Promise((resolve, reject) => {
                            searchModel(query).then((res) => {
                              if (res) {
                                return resolve(res.data);
                              }
                              reject();
                            });
                          });
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {(ModelListActions && <ModelListActions {...Actions} />) || (
                <Button
                  color="secondary"
                  onClick={onAddWrapper}
                  variant="contained"
                >
                  {onAddText ? onAddText : `Create ${modelName}`}
                </Button>
              )}
              {viewOption === 0 && (
                <Grid container justifyContent={justify}>
                  {modelCount && <ModelFilterList form={form} modelCount={modelCount} />}
                  <Grid item md={12}>
                    {defaultView ? (
                      defaultView
                    ) : (
                      <Grid container justifyContent={justify}>
                        <ModelListItems
                          models={models}
                          classes={classes}
                          gridSizes={gridSizes}
                          ModelListItemComponent={ModelListItemComponent}
                          deleteModel={deleteModel}
                          updateModel={updateModel}
                          columnNumber={columnNumber}
                          page={page}
                          history={history}
                          match={match}
                          onView={onViewWrapper}
                          onEdit={onEditWrapper}
                          loading={loading}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid container>
                    <Grid style={{ marginTop: "4em" }} item md={12}>
                      {!noPagination ? (
                        <Paper>
                          <Pagination
                            isSm={isSm}
                            count={modelArray.count}
                            rowsPerPage={10}
                            page={page}
                            onChangeRowsPerPage={(p) => {
                              onChangePage?.(p);
                            }}
                          />
                        </Paper>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <ClientNotification
                notifications={notifications}
                handleClose={(event, reason, notification) => {
                  removeNotification(notification);
                }}
              />
              <FloatingAddButton onClick={onAddWrapper} />
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

export default ModelList;
