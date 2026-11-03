import Split from "./Split";

const Chapter = ({ no, title, aside }) => (
  <header className="mb-12 md:mb-28">
    <div className="mb-6 flex items-center gap-5">
      <span className="chapter__no">Chapter {no}</span>
      <span className="h-px flex-1 bg-line" data-line />
      {aside && (
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">{aside}</span>
      )}
    </div>
    <Split
      as="h2"
      className="font-serif text-[clamp(3.4rem,11vw,10rem)] font-normal leading-[0.92] tracking-[-0.03em]"
      text={title}
    />
  </header>
);

export default Chapter;
