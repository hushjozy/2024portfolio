import { Fragment } from "react";

// Splits text into masked words for reveal animations.
// Wrap words in *asterisks* to set them in the italic accent face.
const Split = ({ text, as: Tag = "span", className = "", mode = "split", ...rest }) => {
  const segments = text.split("*");
  const attr = mode === "read" ? { "data-read": "" } : mode === "split" ? { "data-split": "" } : {};

  return (
    <Tag className={className} aria-label={text.replace(/\*/g, "")} {...attr} {...rest}>
      {segments.map((seg, i) =>
        seg
          .split(" ")
          .filter(Boolean)
          .map((word, j) => (
            // The space must sit outside the inline-block mask or it collapses.
            <Fragment key={`${i}-${j}`}>
              <span className="w" aria-hidden="true">
                <span className={`w__i${i % 2 ? " em" : ""}`}>{word}</span>
              </span>{" "}
            </Fragment>
          ))
      )}
    </Tag>
  );
};

export default Split;
