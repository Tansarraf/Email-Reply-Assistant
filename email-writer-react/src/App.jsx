import { useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate an email reply. Please try again");
      setAlertMessage("Failed to generate a reply");
      setAlertOpen(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        display="flex"
        alignItems="center"
        gap={1}
      >
        <EmailIcon color="primary" />
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional) </InputLabel>
          <Select
            value={tone || ""}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="formal">Formal</MenuItem>
          </Select>
        </FormControl>
        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            startIcon={!loading && <CheckCircleOutlineIcon />}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </motion.div>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ""}
            inputProps={{ readOnly: true }}
          />
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              navigator.clipboard.writeText(generatedReply);
              setAlertMessage("Copied to Clipboard");
              setAlertOpen(true);
            }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
      />
    </Container>
  );
}

export default App;
