
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import "./CardSkeleton.scss";

export const CardSkeleton = () => {
  return (
    <div className="movie-container">
      <div>
        <Skeleton variant="rectangular" width={220} height={330} animation="wave" sx={{ bgcolor: "grey.900", borderRadius: 1 }} />
      </div>
      <Box mt={1}>
        <Skeleton variant="text" width="80%" height={24} animation="wave" sx={{ bgcolor: "grey.800" }} />
      </Box>
      <Box mt={0.5}>
        <Skeleton variant="text" width="40%" height={20} animation="wave" sx={{ bgcolor: "grey.800" }} />
      </Box>
    </div>
  );
};
