import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface HandleDeleteDialogProps {
  workoutId: number;
  handleDelete: (workoutId: number) => void;
  open: boolean; // Accept open as a prop
  onClose: () => void; // Accept onClose to handle closing the dialog
}

const HandleDeleteDialog = ({
  workoutId,
  handleDelete,
  open,
  onClose,
}: HandleDeleteDialogProps) => {
  const handleConfirmDelete = () => {
    handleDelete(workoutId); // Call the handleDelete function to delete the workout
    onClose(); // Close the dialog after confirming
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Workout</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this workout? This action cannot be
        undone. All workout logs associated with this workout will be deleted.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HandleDeleteDialog;
