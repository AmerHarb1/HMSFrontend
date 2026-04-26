import { useState, useEffect, useMemo } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

export default function ProductAutoFill({ onSelect }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

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

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?query=${query}`);
        const data = await res.json();
        setOptions(data);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchProducts, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={(item) => item.productName || ""}
      onInputChange={(e, value) => setQuery(value)}
      onChange={(e, value) => onSelect(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search product"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
}