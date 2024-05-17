import { Button, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import makeApiCall from "../../../utils/ApiCall";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { Api_Methods, ToasterMessages } from "../../../utils/Constants";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EditProject.css";

export default function EditProject({
  projectID,
  open,
  setOpen,
  currentTitle,
  updated,
  setUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(currentTitle);
  }, [currentTitle]);

  function handleClose() {
    setOpen(false);
    setTitle(currentTitle);
  }

  async function handleEdit() {
    try {
      setLoading(true);
      handleClose();
      await makeApiCall(`/projects/${projectID}`, Api_Methods.PATCH, {
        title,
      }).then((_) => {
        setUpdated(!updated);
        toast.success(ToasterMessages.UPDATE_PROJECT_SUCCESS);
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.UPDATE_PROJECT_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
      setTitle("");
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} data-testid="test-edit-project">
        <Box className="edit-project-modal">
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ paddingBottom: "1rem" }}
          >
            Enter New Title
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            data-testid="test-edit-project-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box className="edit-project-modal-buttons">
            <Button
              variant="contained"
              data-testid="test-edit-project-save-btn"
              disabled={title === ""}
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              data-testid="test-edit-project-cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Loader open={loading} />
    </>
  );
}

EditProject.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  projectID: PropTypes.string.isRequired,
  currentTitle: PropTypes.string.isRequired,
  updated: PropTypes.bool.isRequired,
  setUpdated: PropTypes.func.isRequired,
};
