import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CheckboxInput from "Templates/_shared/Forms/Inputs/Forms.CheckboxInput";
// import ModelListItem from "./ModelListItem";
const ModelFilterList = ({ form, modelCount, ...rest }) => {
  const [filterList, setFilterList] = React.useState([]);
  React.useEffect(() => {
    //find the first array field type
    const el = form.fields.find(f => f.type === "array");
    modelCount({}, null, el.name).then(data => {
      setFilterList(data);
    });
  }, []);
  return (
    <div style={{ marginTop: "10px" }}>
      {filterList.map(filter => {
        return (
          <Grid container style={{ marginBottom: "10px" }}>
            <Grid item md={2}>
              <CheckboxInput
                field={{}}
                setFieldValue={(field, checked) => console.log(checked)}
              />
            </Grid>
            <Grid style={{ paddingTop: "10px" }} item md={10}>
              <Typography>
                {filter._id} ({filter.total})
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default ModelFilterList;
