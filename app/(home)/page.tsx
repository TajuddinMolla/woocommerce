import Hero from "./sections/hero";
import Categories from "./sections/categories";
import FeaturedProducts from "./sections/featured-products";
import Testimonials from "./sections/testimonials";
import Newsletter from "./sections/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </>
  );
}
