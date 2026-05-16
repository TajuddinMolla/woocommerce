import { Suspense } from "react";
import ProductLists from "./sections/product-lists";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductLists />
    </Suspense>
  );
}