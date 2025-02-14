import { Avatar, Box, IconButton, Rating } from "@mui/material";
import Grid from "@mui/material/Grid2";
import image from "../../../assets/band.avif";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid container spacing={7}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar className="w-14 h-14 !bg-[#9155FD] text-white mt-1 ml-2">
              U
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="text-lg">User</p>
              <p className="opacity-70 text-sm">February 13, 2025, 11:15 AM</p>
            </div>
          </div>
          <Rating readOnly value={4.5} precision={0.5} />
          <p>Value for money</p>
          <div>
            <img
              className="w-24 h-24 object-cover rounded-md"
              src={image}
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
