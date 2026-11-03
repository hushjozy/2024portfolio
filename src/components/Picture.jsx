// Renders a vite-imagetools `as=picture` import as <picture> with AVIF/WebP sources
// and a JPEG fallback, so each browser downloads the smallest file it can decode.
const Picture = ({ src, alt, sizes, priority = false, ...imgProps }) => (
  <picture>
    {Object.entries(src.sources).map(([format, srcSet]) => (
      <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
    ))}
    <img
      src={src.img.src}
      width={src.img.w}
      height={src.img.h}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : undefined}
      decoding="async"
      {...imgProps}
    />
  </picture>
);

export default Picture;
