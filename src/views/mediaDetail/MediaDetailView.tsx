import { useMemo, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useStores } from "../../hooks/useStores";
import { MediaDetailController } from "./MediaDetailController";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import { DetailSkeleton } from "../../components/DetailSkeleton";

import "./MediaDetail.scss";

export const MediaDetailView = observer(() => {
  const { id, media_type } = useParams();
  const navigate = useNavigate();

  const { mediaDetailStore } = useStores();

  const movieController = useMemo(() => new MediaDetailController(mediaDetailStore), [mediaDetailStore]);

  useEffect(() => {
    if (!id || !media_type) return;
    movieController.getMedia(media_type, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media_type, id]);

  return (
    <div>
      {mediaDetailStore.error ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
          <Typography variant="h5" color="error" gutterBottom>
            Error
          </Typography>
          <Typography variant="body1">{mediaDetailStore.error}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      ) : mediaDetailStore.isLoading ? (
        <DetailSkeleton />
      ) : mediaDetailStore.media ? (
        <div>
          <div className="navigation">
          <div className="navigation">
            <Button size="small" variant="text" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
          </div>
          <div id="mediaDetail">
            <div>
              <ImageWithFallback
                src={`https://image.tmdb.org/t/p/w440_and_h660_face${mediaDetailStore.media.poster_path}`}
                alt="poster"
                width={440}
                height={660}
              />
            </div>
            <div className="details">
              <div className="title">{mediaDetailStore.media.title || mediaDetailStore.media.name}</div>
              <div className="date">
                {dayjs(mediaDetailStore.media.release_date || mediaDetailStore.media.first_air_date).format(
                  "MMM DD, YYYY"
                )}
              </div>
              <div className="overview">{mediaDetailStore.media.overview}</div>
            </div>
          </div>
        </div>
      ) : undefined}
    </div>
  );
});
