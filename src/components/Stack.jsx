import { stack } from "../data";
import Chapter from "./Chapter";

const Stack = () => (
  <section className="section" id="stack">
    <Chapter no="05" title="The *toolkit*" aside="What I reach for" />
    {/* gap-px over a line-coloured background draws the dividers */}
    <div className="grid gap-px border-y border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
      {stack.map((g, i) => (
        <div key={g.group} data-rise={i * 0.08} className="bg-bg px-1 py-8 sm:px-6">
          <span className="mb-6 block font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
            <span className="em text-xl normal-case text-ochre">0{i + 1}</span> {g.group}
          </span>
          <ul>
            {g.items.map((item) => (
              <li key={item} className="group text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.5] tracking-[-0.03em]">
                <span className="inline-block transition duration-500 ease-expo group-hover:translate-x-2.5 group-hover:font-serif group-hover:italic group-hover:text-ochre">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Stack;
