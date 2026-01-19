export default function AsciiArt() {
  const art = `
    ╔═══════════════════════════════════════════════╗
    ║                                               ║
    ║      ┌─────┐    ╭──────╮    ┌─────┐          ║
    ║      │ DNA │───→│ CELL │───→│ OUT │          ║
    ║      └─────┘    ╰──────╯    └─────┘          ║
    ║         ↑          ↓                         ║
    ║      ┌─────┐    ╭──────╮                     ║
    ║      │ IN  │←───│SENSOR│                     ║
    ║      └─────┘    ╰──────╯                     ║
    ║                                               ║
    ║         c y b e r g e n e t i c s           ║
    ║                                               ║
    ╚═══════════════════════════════════════════════╝
  `;

  return (
    <pre className="text-[10px] sm:text-xs leading-tight text-muted overflow-x-auto whitespace-pre">
      {art}
    </pre>
  );
}
