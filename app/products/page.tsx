import { Suspense } from "react";
import { CircleLoader } from "@/components/ui/circle-loader";
import ProductLists from "./sections/product-lists";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <CircleLoader size="lg" />
        </div>
      }
    >
      <ProductLists />
    </Suspense>
  );
}
