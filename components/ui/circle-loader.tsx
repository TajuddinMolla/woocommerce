import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-5 border-2",
  md: "size-8 border-2",
  lg: "size-12 border-[3px]",
} as const;

type CircleLoaderProps = {
  className?: string;
  size?: keyof typeof sizeClasses;
};

export function CircleLoader({ className, size = "md" }: CircleLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-stone-200 border-t-primary",
        sizeClasses[size],
        className,
      )}
    />
  );
}
