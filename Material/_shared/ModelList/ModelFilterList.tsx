import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import * as Inputs from "../Forms/Inputs";

interface FormField {
  name: string;
  type: string;
}

interface Form {
  fields: FormField[];
}

interface Filter {
  _id: string;
  total: number;
}

interface ModelFilterListProps {
  form: Form;
  modelCount: (args: any, callback: any, fieldName: string) => Promise<Filter[]>;
  [key: string]: unknown;
}

const ModelFilterList: React.FC<ModelFilterListProps> = ({ form, modelCount, ...rest }) => {
  const [filterList, setFilterList] = useState<Filter[]>([]);

  useEffect(() => {
    // Find the first array field type
    const el = form.fields.find(f => f.type === "array");
    if (el) {
      modelCount({}, null, el.name).then(data => {
        setFilterList(data);
      });
    }
  }, [form, modelCount]);

  return (
    <div style={{ marginTop: "10px" }}>
      {filterList.map((filter) => (
        <Grid container style={{ marginBottom: "10px" }} key={filter._id}>
          <Grid item md={2}>
            <Inputs.CheckboxInput
              field={{ name: filter._id, placeholder: '' }}
              setFieldValue={(field: string, checked: boolean) => console.log(checked)}
            />
          </Grid>
          <Grid style={{ paddingTop: "10px" }} item md={10}>
            <Typography>
              {filter._id} ({filter.total})
            </Typography>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default ModelFilterList;
