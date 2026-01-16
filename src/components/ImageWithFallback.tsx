import { useState } from "react";
import Box from "@mui/material/Box";
import MovieIcon from "@mui/icons-material/Movie";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const ImageWithFallback = ({ src, alt, className, width, height }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <Box
        className={className}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="grey.900"
        color="grey.700"
        width={width}
        height={height}
        sx={{ borderRadius: 2, minHeight: height ? undefined : "100%", minWidth: width ? undefined : "100%" }}
      >
        <MovieIcon sx={{ fontSize: 60, opacity: 0.5 }} />
      </Box>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      style={{
        objectFit: "cover",
        width: "100%",
        height: height && width ? "auto" : height || "100%",
        maxWidth: width || "100%",
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        borderRadius: "8px",
      }}
    />
  );
};
