import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";

export function ExceptionPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const message = state?.message || "Unknown error";
  const stackTrace = state?.stackTrace;
  const exceptionDate = state?.exceptionDate;

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, maxWidth: 700 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Backend Exception
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {message}
        </Typography>

        {exceptionDate && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Time:</strong> {exceptionDate}
          </Typography>
        )}

        {stackTrace && (
          <Typography
            variant="body2"
            sx={{
              background: "#f5f5f5",
              p: 2,
              borderRadius: 1,
              whiteSpace: "pre-wrap",
              mb: 2,
              fontFamily: "monospace"
            }}
          >
            {stackTrace}
          </Typography>
        )}

        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Paper>
    </Box>
  );
}