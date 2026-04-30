import { useState, useEffect, useMemo } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import axios from 'axios';
import { getHeader } from "../functions/getHeader";
import '../styles/page.css';

export function ProductAutoFill({ autoFillLink, value, onSelect }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const link = "http://localhost:9002/hms/";
  const apiLink = link + autoFillLink;
  const headers = getHeader();
  const selectedOption = options.find(opt => opt.id === value?.id) || value || null;
//console.log(apiLink)
  // Debounce input to avoid hammering backend
  const debouncedQuery = useMemo(() => {
      const handler = setTimeout(() => {}, 300);
      return query;
    }, [query]);

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

  return (
    <Autocomplete 
      value={selectedOption} //the selected object
      options={options}
      loading={loading} //the text the user is typing
      getOptionLabel={(item) => item.productDescription || ""}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
        setQuery(newInputValue);
      }}
      onChange={(e, value) => onSelect(value)}
      renderInput={(params) => {
        const { InputProps, ...rest } = params; // remove InputProps from the spread
        return (
          <TextField
            {...rest}
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
              ...InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {InputProps?.endAdornment}
                </>
              )
            }}
          />
        )
      }
    }
  />
)
}