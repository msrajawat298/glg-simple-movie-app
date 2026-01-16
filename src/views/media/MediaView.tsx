import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";

import { useStores } from "../../hooks/useStores";
import { Movie, MediaCategory } from "../../definitions/Movie";
import { MediaController } from "./MediaController";

import { MediaComponent } from "./components/media/MediaComponent";
import { CardSkeleton } from "../../components/CardSkeleton";

import "./Media.scss";

export const MediaView = observer(() => {
  const { mediaStore } = useStores();
  const { media, isLoading, activeCategory } = mediaStore;

  const mediaController = useMemo(() => new MediaController(mediaStore), [mediaStore]);

  useEffect(() => {
    mediaController.loadCategory(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNav = (type: MediaCategory) => {
    mediaController.loadCategory(type);
  };

  return (
    <div>
      <div className="navigation">
        <Button
          size="small"
          variant="text"
          className={activeCategory === "all" ? "selected" : undefined}
          onClick={() => handleNav("all")}
        >
          All
        </Button>
        <Button
          size="small"
          variant="text"
          className={activeCategory === "movies" ? "selected" : undefined}
          onClick={() => handleNav("movies")}
        >
          Movies
        </Button>
        <Button
          size="small"
          variant="text"
          className={activeCategory === "tv" ? "selected" : undefined}
          onClick={() => handleNav("tv")}
        >
          TV Shows
        </Button>
      </div>
      <div id="media">
        {isLoading
          ? Array.from(new Array(10)).map((_, index) => <CardSkeleton key={index} />)
          : media.map((m: Movie, i) => <MediaComponent movie={m} key={i} />)}
      </div>
    </div>
  );
});
