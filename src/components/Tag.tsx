export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-sky/40 bg-sky/5 px-1.5 py-0.5 text-[10px] text-sky">
      {children}
    </span>
  );
}
