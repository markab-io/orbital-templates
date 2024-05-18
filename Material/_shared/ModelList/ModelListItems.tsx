/**
 * Renders a list of model items.
 *
 * @component
 * @param {Object[]} models - The array of models to render.
 * @param {Object} gridSizes - The grid sizes for responsive layout.
 * @param {number} columnNumber - The number of columns in the grid.
 * @param {Object} classes - The CSS classes for styling.
 * @param {React.ComponentType} ModelListItemComponent - The custom component for rendering each model item.
 * @param {boolean} open - The state for controlling the open/close state of the model item.
 * @param {function} setOpen - The function to set the open state of the model item.
 * @param {function} deleteModel - The function to delete a model.
 * @param {function} updateModel - The function to update a model.
 * @param {Object} deletedModel - The deleted model object.
 * @param {function} setDeletedModel - The function to set the deleted model object.
 * @param {function} onEdit - The function to handle the edit action.
 * @param {function} onView - The function to handle the view action.
 * @param {Object} match - The match object from React Router.
 * @param {Object} history - The history object from React Router.
 * @param {number} page - The current page number.
 * @param {boolean} loading - The loading state.
 * @param {string} mode - The mode of the model list.
 * @param {boolean} In - The state for controlling the fade in effect.
 * @param {function} setIn - The function to set the fade in state.
 * @param {Object} rest - The rest of the props.
 * @returns {React.Component} The rendered list of model items.
 */

import React, { useEffect } from "react";
import ModelListCardItem from "./ModelListCardItem";
import { Grid } from "@mui/material";
import Empty from "../Empty/Empty";

interface Model {
  _id: string;
  name?: string;
  title?: string;
  image?: string;
  tags?: string[];
}

interface ModelListItemsProps {
  models: Model[];
  gridSizes: any;
  columnNumber: number;
  classes: any;
  ModelListItemComponent?: React.ComponentType<any>;
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteModel: (model: Model) => Promise<void>;
  updateModel: (model: Model, values: any) => Promise<void>;
  deletedModel: Model;
  setDeletedModel: (model: Model) => void;
  onEdit: (model: Model) => void;
  onView: (model: Model) => void;
  match: any;
  history: any;
  page: number;
  loading: boolean;
  mode: string;
  In: boolean;
  setIn: (In: boolean) => void;
  [key: string]: any;
}

const ModelListItems: React.FC<ModelListItemsProps> = ({
  models,
  gridSizes,
  columnNumber,
  classes,
  ModelListItemComponent,
  open,
  setOpen,
  deleteModel,
  updateModel,
  deletedModel,
  setDeletedModel,
  onEdit,
  onView,
  match,
  history,
  page,
  loading,
  mode,
  In,
  setIn,
  ...rest
}) => {
  useEffect(() => {
    setTimeout(() => {
      setIn(true);
    }, 200);
  }, [setIn]);

  if (models && Array.isArray(models) && models.length > 0) {
    return (
      <>
        {models.map((model, index) => (
          <Grid
            style={{
              marginRight: "2em",
            }}
            key={index}
            xs={gridSizes ? gridSizes.xs : 12}
            sm={gridSizes ? gridSizes.sm : 12}
            md={gridSizes ? gridSizes.md : 12}
            lg={gridSizes ? gridSizes.lg : 12}
            xl={gridSizes ? gridSizes.xl : 12}
            item
          >
            <div className={classes.listContainer}>
              {ModelListItemComponent ? (
                <ModelListItemComponent
                  classes={classes}
                  match={match}
                  open={open}
                  setOpen={setOpen}
                  model={model}
                  updateModel={updateModel}
                  deleteModel={deleteModel}
                  setDeletedModel={setDeletedModel}
                  deletedModel={deletedModel}
                  history={history}
                  columnNumber={columnNumber}
                  onEdit={onEdit}
                  onView={onView}
                  page={page}
                  {...rest}
                />
              ) : (
                <ModelListCardItem
                  classes={classes}
                  match={match}
                  open={open}
                  setOpen={setOpen}
                  model={model}
                  updateModel={updateModel}
                  deleteModel={deleteModel}
                  setDeletedModel={setDeletedModel}
                  deletedModel={deletedModel}
                  history={history}
                  columnNumber={columnNumber}
                  onEdit={onEdit}
                  onView={onView}
                  page={page}
                  mode={mode}
                  {...rest}
                />
              )}
            </div>
          </Grid>
        ))}
      </>
    );
  }
  return <Empty />;
};

export default ModelListItems;
