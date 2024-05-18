import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Icon, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  chipTextField: {
    padding: "10px",
  },
}));

interface Field {
  type: string;
  name: string;
  placeholder: string;
}

interface EditableArrayProps {
  field: Field;
  values: { [key: string]: string[] };
  setFieldValue: (field: string, value: unknown) => void;
}

const EditableArray: React.FC<EditableArrayProps> = ({ field, values, setFieldValue }) => {
  const classes = useStyles();
  const [editableArray, setEditableArray] = useState<{ [key: string]: string[] }>({});
  const [edited, setEdited] = useState<number | null>(null);

  useEffect(() => {
    if (field && field.type === "array") {
      setEditableArray({
        ...editableArray,
        [field.name]: values[field.name],
      });
    }
  }, [field, values]);

  const handleBlur = () => {
    setEdited(null);
  };

  const handleChange = (i: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newArray = editableArray[field.name].map((e, index) => (index === i ? event.target.value : e));
    setEditableArray({ ...editableArray, [field.name]: newArray });
    setFieldValue(field.name, newArray);
  };

  const handleDelete = (i: number) => {
    const newArray = editableArray[field.name].filter((_, index) => index !== i);
    setEditableArray({ ...editableArray, [field.name]: newArray });
    setFieldValue(field.name, newArray);
  };

  const handleAdd = () => {
    const newArray = editableArray[field.name] ? [...editableArray[field.name], ""] : [""];
    setEditableArray({ ...editableArray, [field.name]: newArray });
    setEdited(newArray.length - 1);
  };

  return (
    <>
      <Typography>{field.placeholder}</Typography>
      {editableArray[field.name] &&
        editableArray[field.name].map((item, i) => (
          <div key={`${field.name}-${i}`} className={classes.chipTextField}>
            {edited === i ? (
              <TextField
                value={editableArray[field.name][i] || ""}
                autoFocus
                onBlur={handleBlur}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(i, event)}
              />
            ) : (
              <Chip
                label={editableArray[field.name][i]}
                onClick={() => setEdited(i)}
                onDelete={() => handleDelete(i)}
              />
            )}
          </div>
        ))}
      <Button variant="contained" style={{ marginLeft: "10px" }} onClick={handleAdd}>
        <Icon>add</Icon>
      </Button>
    </>
  );
};

export default EditableArray;
