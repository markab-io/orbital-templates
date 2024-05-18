/**
 * Represents a single item in the model list.
 * @module ModelListItem
 */

import React, { useState, MouseEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button
} from "@mui/material";

interface Model {
  _id: string;
  name?: string;
  title?: string;
  image?: string;
}

interface ModelListItemProps {
  classes: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  model: Model;
  deleteModel: (model: Model) => Promise<void>;
  setDeletedModel: (model: Model) => void;
  deletedModel: Model;
  match: any; // Define a specific type if available
  history: any; // Define a specific type if available
  onEdit?: (model: Model) => void;
  gridDisplay?: boolean;
  onView?: (model: Model) => void;
}

const ModelListItem: React.FC<ModelListItemProps> = ({
  classes,
  open,
  setOpen,
  model,
  deleteModel,
  setDeletedModel,
  deletedModel,
  match,
  history,
  onEdit,
  onView
}) => {
  const [actionOpen, setActionOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * Handles the click event of the "more" button to open the action menu.
   * @function handleMoreButtonClick
   * @param {Object} event - The click event object.
   */
  const handleMoreButtonClick = (event: MouseEvent<HTMLElement>) => {
    setActionOpen(true);
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the close event of the action menu.
   * @function handleMenuClose
   * @param {Object} event - The close event object.
   */
  const handleMenuClose = () => {
    setActionOpen(false);
    setAnchorEl(null);
  };

  /**
   * Handles the click event of the "view" menu item.
   * @function handleViewClick
   */
  const handleViewClick = () => {
    onView ? onView(model) : history.push(`${match.url}/view/${model._id}`);
  };

  /**
   * Handles the click event of the "edit" menu item.
   * @function handleEditClick
   */
  const handleEditClick = () => {
    onEdit ? onEdit(model) : history.push(`${match.url}/edit/${model._id}`);
  };

  /**
   * Handles the click event of the "delete" menu item.
   * @function handleDeleteClick
   */
  const handleDeleteClick = () => {
    setDeletedModel(model);
    setOpen(true);
  };

  /**
   * Handles the confirm event of the delete modal.
   * @function handleConfirmDelete
   */
  const handleConfirmDelete = () => {
    deleteModel(deletedModel).then(() => {
      setOpen(false);
    });
  };

  return (
    <>
      <ListItem className={classes.listItemContainer} key={model._id}>
        {model.image ? <Avatar src={`${model.image}`} /> : <Avatar />}
        <ListItemText>
          <Typography>{model.name || model.title}</Typography>
        </ListItemText>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMoreButtonClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={actionOpen}
          id="fade-menu"
          keepMounted
          onClose={handleMenuClose}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={handleViewClick}>
            <Button>view</Button>
          </MenuItem>
          <MenuItem onClick={handleEditClick}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </MenuItem>
        </Menu>
      </ListItem>
      <ConfirmDeleteModal
        open={open}
        setOpen={setOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ModelListItem;
