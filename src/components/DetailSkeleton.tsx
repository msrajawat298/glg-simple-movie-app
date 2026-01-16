import Skeleton from "@mui/material/Skeleton";

export const DetailSkeleton = () => {
  return (
    <div id="mediaDetail">
      <div>
        <Skeleton variant="rectangular" width={440} height={660} animation="wave" sx={{ bgcolor: "grey.900", borderRadius: 2 }} />
      </div>
      <div className="details" style={{ width: "100%" }}>
        <Skeleton variant="text" width="60%" height={60} animation="wave" sx={{ bgcolor: "grey.800", mb: 2 }} />
        <Skeleton variant="text" width="30%" height={30} animation="wave" sx={{ bgcolor: "grey.800", mb: 4 }} />
        <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ bgcolor: "grey.800" }} />
        <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ bgcolor: "grey.800" }} />
        <Skeleton variant="text" width="80%" height={20} animation="wave" sx={{ bgcolor: "grey.800" }} />
      </div>
    </div>
  );
};
