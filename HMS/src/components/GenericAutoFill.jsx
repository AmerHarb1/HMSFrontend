import { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import axios from 'axios';
import { getHeader } from "../functions/getHeader";
import '../styles/page.css';

export function GenericAutoFill({
  autoFillLink,     // backend endpoint
  value,            // initial selected object
  onSelect,         // callback when user selects
  labelField,       // field to display (e.g., "productDescription")
}) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const apiLink = "http://localhost:9002/hms/" + autoFillLink;
  const headers = getHeader();

  useEffect(() => {
    if (!query) {
      setOptions([]);
      return;
    }

    const fetchAutoFillObj = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiLink}/${query}`, { headers }); 
        const data =  res.data;
        console.log(res.data)
        setOptions(data);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchAutoFillObj, 300);
      return () => clearTimeout(delay);
    }, [query]);

    console.log(value)
    console.log(options)
    const selectedOption =
        options.find(opt =>
            (value?.id && opt.autoFillObjId === value.autoFillObjId) ||
            (value?.autoFillObjCode && opt.autoFillObjCode === value.autoFillObjCode)
        ) || value || null;

  return (
    <Autocomplete
      value={selectedOption}    //the selected object
      inputValue={inputValue}   //the text the user is typing
      options={options}
      loading={loading}
      getOptionLabel={(item) => item?.[labelField] || ""}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
        setQuery(newInputValue);
      }}
      onChange={(e, value) => onSelect(value)}
      renderInput={(params) => {
        //const { InputProps, ...rest } = params; // remove InputProps from the spread
        return (
            <TextField
                {...params}
                className="autofill-input"
                label="Auto Fill"
                sx={{
                "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    height: 48,
                    borderRadius: 2,
                    padding: 0
                },
                "& .MuiOutlinedInput-input": {
                    height: 30,
                    lineHeight: "30px"
                }
                }}
                InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps?.endAdornment}
                    </>
                )
                }}
            />
        )
        }
    }
    />
  );
}