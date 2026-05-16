
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";

type Props = { onClear: () => void };

export function EmptyState({ onClear }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <PackageSearch className="h-16 w-16 text-muted-foreground/40 mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-1">
        No products found
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        {`Try adjusting your filters or search terms to find what you're looking for.`}
      </p>
      <Button onClick={onClear} variant="outline">
        Clear All Filters
      </Button>
    </div>
  );
}
