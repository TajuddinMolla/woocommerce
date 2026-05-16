import { PackageSearch } from "lucide-react";

type Props = { children?: React.ReactNode; title: string; description: string };

export function EmptyState({ children, title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <PackageSearch className="h-16 w-16 text-muted-foreground/40 mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        {description}
      </p>
      {children}
    </div>
  );
}
