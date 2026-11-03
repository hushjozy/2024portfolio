import { Fragment } from "react";

// Splits text into masked words for reveal animations.
// Wrap words in *asterisks* to set them in the display accent face,
// and a single word in ~tildes~ to give it the brush stroke.
const Split = ({ text, as: Tag = "span", className = "", mode = "split", ...rest }) => {
  const segments = text.split("*");
  const attr = mode === "read" ? { "data-read": "" } : mode === "split" ? { "data-split": "" } : {};

  return (
    <Tag className={className} aria-label={text.replace(/[*~]/g, "")} {...attr} {...rest}>
      {segments.map((seg, i) =>
        seg
          .split(" ")
          .filter(Boolean)
          .map((word, j) => {
            const brush = /^~.+~$/.test(word);
            const cls = `w__i${i % 2 ? " em" : ""}${brush ? " brush" : ""}`;
            return (
              // The space must sit outside the inline-block mask or it collapses.
              <Fragment key={`${i}-${j}`}>
                <span className={`w${brush ? " w--brush" : ""}`} aria-hidden="true">
                  <span className={cls}>{brush ? word.slice(1, -1) : word}</span>
                </span>{" "}
              </Fragment>
            );
          })
      )}
    </Tag>
  );
};

export default Split;
