import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ImageGallery from "react-image-gallery";
import { ConfirmDeleteModal, Inputs } from "Templates";
import "react-image-gallery/styles/css/image-gallery.css";
import { withState, compose } from "recompose";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  MaterialTable,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography
} from "Templates";

const enhance = compose(withState("open", "setOpen", false));

const ModelPreview = enhance(
  ({ model, onEdit, form, open, setOpen, deleteModel, onDelete, classes }) => {
    if (form && model) {
      let previewList = form.fields.map((field, index) => {
        if (
          field.type === "text" ||
          field.type === "number" ||
          field.type === "checkbox"
        ) {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{model[field.name]}</Typography>
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "select") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {model[`${field.name}Value`]
                    ? model[`${field.name}Value`]
                    : model[`${field.name}`]}
                </Typography>
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "email") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{model[field.name]}</Typography>
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "password") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>{model[field.name]}</TableCell>
            </TableRow>
          );
        }
        if (field.type === "datetime" || field.type === "date") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>{model[field.name]}</TableCell>
            </TableRow>
          );
        }
        if (field.type === "text-editor") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>{model[field.name]}</TableCell>
            </TableRow>
          );
        }
        if (field.type === "markdown") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Inputs.MarkdownInput
                  previewOnly={true}
                  field={field}
                  value={model[field.name]}
                />
              </TableCell>
            </TableRow>
          );
        }
      });
      return (
        <>
          <Card className={classes.previewContent}>
            <CardHeader
              title={model.title || model.name}
              action={
                <>
                  <IconButton
                    onClick={() => {
                      onEdit(model);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            />
            {model.image && (
              <Grid container justify="center" style={{ height: "200px" }}>
                <CardMedia
                  component="img"
                  alt={model.title || model.name}
                  image={model.image}
                  title="Contemplative Reptile"
                  style={{ height: "200px", width: "auto" }}
                />
              </Grid>
            )}
            {model.gallery && (
              <>
                {/* <Typography>Gallery</Typography> */}
                {model.gallery.length > 0 ? (
                  <ImageGallery
                    items={model.gallery.map(image => {
                      return {
                        original: image,
                        thumbnail: image
                      };
                    })}
                  />
                ) : (
                  ""
                )}
              </>
            )}
            <CardContent>
              <MaterialTable>
                <TableBody>{previewList}</TableBody>
              </MaterialTable>
            </CardContent>
          </Card>
          <ConfirmDeleteModal
            open={open}
            setOpen={setOpen}
            onConfirm={() => {
              deleteModel(model).then(() => {
                setOpen(false);
                onDelete();
              });
            }}
          />
        </>
      );
    }
    return <></>;
  }
);

export default ModelPreview;
