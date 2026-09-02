export function DotField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: "radial-gradient(#E7EAEF 1px, transparent 1.2px)",
        backgroundSize: "16px 16px",
        maskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
    />
  );
}
