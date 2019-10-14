import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ImageGallery from "react-image-gallery";
import ConfirmDeleteModal from "Templates/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
import "react-image-gallery/styles/css/image-gallery.css";
import { withState, compose } from "recompose";
import { MarkdownInput } from "Templates/_shared/Forms/Inputs";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography
} from "@material-ui/core";

const enhance = compose(withState("open", "setOpen", false));

const ModelPreview = enhance(
  ({ model, onEdit, form, open, setOpen, deleteModel, onDelete }) => {
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
                <MarkdownInput
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
          <Card>
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
                <Typography>Gallery</Typography>
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
              <Table>
                <TableBody>{previewList}</TableBody>
              </Table>
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
