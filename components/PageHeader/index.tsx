type PageHeaderProps = {
  header: string ;
  subheader: string;
};

export default function PageHeader({ header, subheader }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 mb-4 w-full bg-background/90 py-2 text-center backdrop-blur">
      <h1 className="font-logo text-4xl text-primary">{header}</h1>
      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {subheader}
      </p>
    </header>
  );
}
