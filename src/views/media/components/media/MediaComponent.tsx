import { Movie } from "../../../../definitions/Movie";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ImageWithFallback } from "../../../../components/ImageWithFallback";

import "./MediaComponent.scss";

interface MovieProps {
  movie: Movie;
}

export const MediaComponent = (props: MovieProps) => {
  const { movie } = props;
  const image = `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`;

  return (
    <div className="movie-container">
      <div>
        <Link to={`/${movie.media_type}/${movie.id}`}>
          <ImageWithFallback src={image} alt="poster" width={220} height={330} />
        </Link>
      </div>
      <div className="title">{movie.title || movie.name}</div>
      <div className="date">{dayjs(movie.release_date || movie.first_air_date).format("MMM DD, YYYY")}</div>
    </div>
  );
};
