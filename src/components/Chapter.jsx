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
      className="font-serif text-[clamp(3rem,9.5vw,8.5rem)] font-normal leading-[0.95] tracking-[-0.01em]"
      text={title}
    />
  </header>
);

export default Chapter;
