import type { PrintTemplate, TemplateBlock } from "@/app/resources/templates/templates";

// Renders a printable one-page template from data blocks. Server-renderable —
// no state; the Print button is a separate client component.

const WIDTHS = { full: "w-full", half: "w-1/2", third: "w-1/3" } as const;

function Block({ block }: { block: TemplateBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h3 className="mt-4 border-b-2 border-navy-900 pb-1 font-serif text-base font-semibold text-navy-900 first:mt-0">
          {block.text}
        </h3>
      );
    case "fields":
      return (
        <div className="mt-3 flex flex-wrap gap-y-2 first:mt-0">
          {block.items.map((f) => (
            <p key={f.label} className={`${WIDTHS[f.width ?? "full"]} pr-4 text-sm text-navy-900`}>
              <span className="font-medium">{f.label}:</span>{" "}
              <span className="inline-block w-[45%] min-w-24 border-b border-navy-400">&nbsp;</span>
            </p>
          ))}
        </div>
      );
    case "table":
      return (
        <table className="mt-3 w-full border-collapse first:mt-0">
          <thead>
            <tr>
              {block.columns.map((c) => (
                <th
                  key={c.header}
                  style={c.width ? { width: c.width } : undefined}
                  className="border border-navy-900 bg-sand-100 px-2 py-1 text-left text-xs font-semibold text-navy-900 print:bg-transparent"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.exampleRow && (
              <tr>
                {block.exampleRow.map((cell, i) => (
                  <td key={i} className="border border-navy-300 px-2 py-1 text-xs italic text-navy-500">
                    {cell}
                  </td>
                ))}
              </tr>
            )}
            {Array.from({ length: block.rows }).map((_, r) => (
              <tr key={r}>
                {block.columns.map((c) => (
                  <td key={c.header} className="h-7 border border-navy-300 px-2" />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "lines":
      return (
        <div className="mt-3 first:mt-0">
          {block.label && <p className="text-sm font-medium text-navy-900">{block.label}</p>}
          {Array.from({ length: block.count }).map((_, i) => (
            <div key={i} className="mt-4 border-b border-navy-400" />
          ))}
        </div>
      );
    case "checklist":
      return (
        <div className="mt-3 first:mt-0">
          {block.label && <p className="text-sm font-medium text-navy-900">{block.label}</p>}
          <ul className="mt-1.5 space-y-1.5">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy-900">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-block h-3.5 w-3.5 shrink-0 border border-navy-900"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "note":
      return <p className="mt-3 text-xs italic leading-snug text-navy-600">{block.text}</p>;
  }
}

export default function TemplateSheet({ template }: { template: PrintTemplate }) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 print:rounded-none print:border-0 print:p-0 sm:p-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-navy-900 pb-2">
        <h2 className="font-serif text-xl font-semibold text-navy-900">{template.title}</h2>
        <p className="text-xs text-navy-500">truecourse education group</p>
      </div>
      <div className="mt-4">
        {template.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
