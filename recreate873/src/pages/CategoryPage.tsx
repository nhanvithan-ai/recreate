import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const category = CATEGORIES.find((c) => c.id === id);

  const categoryProducts = PRODUCTS.filter(
    (product) => product.category === id
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-4xl">
        Category Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 p-3 rounded-full bg-black/40 border border-white/10"
      >
        <ArrowLeft />
      </button>

      {/* HERO SECTION */}
      <section className="relative h-[75vh] flex items-center justify-center">

        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6 max-w-5xl">

          <p className="uppercase tracking-[0.5em] text-[11px] md:text-sm text-yellow-300 mb-6">
            PREMIUM COLLECTION
          </p>

          <h1 className="text-5xl md:text-8xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400">
            {category.title}
          </h1>

          <p className="mt-8 text-lg md:text-2xl italic text-white/75">
            {category.subtitle}
          </p>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {categoryProducts.map((product, idx) => {

            const isLiked = wishlist.includes(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass rounded-3xl overflow-hidden border border-white/10"
              >

                {/* IMAGE */}
                <div className="relative group">

                  <img
                    src={product.images[0]}
                    className="w-full h-[320px] object-cover"
                  />

                  {/* LIKE BUTTON */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-black/40 rounded-full"
                  >
                    <Heart
                      className={
                        isLiked
                          ? "text-ember fill-ember"
                          : "text-white"
                      }
                    />
                  </button>

                </div>

                {/* INFO */}
                <div className="p-5 space-y-3">

                  <h3 className="text-lg font-serif">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <div className="flex items-center justify-between">
                    <p className="text-ember font-bold">
                      ₹{product.price}
                    </p>

                    <p className="text-xs text-white/40 line-through">
                      ₹{product.originalPrice}
                    </p>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    onClick={() =>
                      addToCart(
                        product,
                        product.sizes[0],
                        product.colors[0]
                      )
                    }
                    className="w-full mt-2 py-3 bg-gradient-to-r from-ember to-glow text-black font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>

                </div>

              </motion.div>
            );
          })}

        </div>

      </section>
    </div>
  );
}