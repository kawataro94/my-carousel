export function Detail({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border rounded-sm shadow-sm text-sm">{children}</div>
  );
}

export function DetailList({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[200px_1px_auto]">{children}</div>;
}

export function DetailName({ children }: { children: React.ReactNode }) {
  return (
    <span className="p-2 bg-slate-100 text-center text-muted-foreground">
      {children}
    </span>
  );
}

export function DetailValue({ children }: { children: React.ReactNode }) {
  return <span className="p-2">{children}</span>;
}
