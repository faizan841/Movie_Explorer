import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IMAGES_PATH } from "../config";
import { Link } from "react-router-dom";
import { mapGenres } from "../lib/helper";
import { styled } from "@mui/system";

const ImgStyled = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const ImageListItemStyled = styled(ImageListItem)({
  overflow: "hidden",
});

const Movies = ({ movies, genres }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <ImageList cols={matchDownMd ? 1 : 5} rowHeight={365} gap={12}>
        {movies.results.map((movie) => (
          <ImageListItemStyled key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <ImgStyled
                  src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <ImageListItemBar
                title={movie.title}
                subtitle={<span>{mapGenres(movie.genre_ids, genres)}</span>}
              />
            </Link>
          </ImageListItemStyled>
        ))}
      </ImageList>
    </>
  );
};

export default Movies;
