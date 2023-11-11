/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete as MaterialAutoComplete, TextField } from "@mui/material";
import { useEffect } from "react";

export interface AutoCompleteOption {
  label: string;
  selectedOption: any;
}

interface PropsType {
  label: string;
  placeholder: string;
  setState: Function;
  value: any;
  options: AutoCompleteOption[];
}

function Autocomplete(props: PropsType) {
  const { setState, value, options, label, placeholder } = props;
  useEffect(() => {
    console.log("options from autocomplete", props.options);
  }, [options]);

  return (
    <MaterialAutoComplete
      popupIcon
      options={options}
      value={value}
      onChange={(event, newValue) => {
        setState(newValue);
      }}
      size="small"
      onInputChange={(event, newInputValue) => {}}
      getOptionLabel={(option: AutoCompleteOption) => {
        return option.label || value;
      }}
      isOptionEqualToValue={(option, value) => option?.label === value.label}
      renderInput={(params) => (
        <TextField
          {...params}
          name={"custom-name"}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}

export default Autocomplete;
