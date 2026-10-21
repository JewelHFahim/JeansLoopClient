'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { ProductReviews } from '@/components/product/ProductReviews';
import type { Product, ProductVariant } from '@/lib/api-types';

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  // Each product represents a garment in one specific color
  const productColor =
    product.color?.trim() ||
    product.variants?.[0]?.color?.trim() ||
    '';

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );

  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  const hasDiscount = Boolean(
    product.discountedPrice &&
      product.discountedPrice > 0 &&
      product.discountedPrice < product.price
  );
  const displayPrice = hasDiscount ? product.discountedPrice! : selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    if (!selectedVariant && product.variants?.length > 0) {
      toast.error('Please select a size first');
      return;
    }

    if (selectedVariant && selectedVariant.stock < quantity) {
      toast.error(`Only ${selectedVariant.stock} items available in stock`);
      return;
    }

    const itemColor = productColor || selectedVariant?.color || 'Default';
    const itemSize = selectedVariant?.size || 'Standard';

    addItem({
      productId: product._id,
      variantSku: selectedVariant?.sku || `${product._id}-default`,
      name: product.name,
      price: displayPrice,
      quantity,
      image: selectedImage || product.images?.[0],
      size: itemSize,
      color: itemColor,
    });

    toast.success(
      `"${product.name}"${itemColor !== 'Default' ? ` (${itemColor} / ${itemSize})` : ` (${itemSize})`} added to bag!`
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-black">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-black bg-neutral-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-400">
                No Image
              </div>
            )}

            {hasDiscount && (
              <div className="absolute top-0 left-0 bg-amber-400 text-black text-xs font-black uppercase tracking-widest px-3.5 py-1.5 border-b-2 border-r-2 border-black">
                Special Offer
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-20 flex-shrink-0 border-2 overflow-hidden transition-all ${
                    selectedImage === img ? 'border-black ring-2 ring-black' : 'border-neutral-300 opacity-60'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                {product.category}
              </p>

              {/* Quick Reviews rating jump link */}
              <a
                href="#reviews-section"
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black hover:underline"
              >
                <div className="flex items-center text-amber-500 fill-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" />
                </div>
                <span>4.9 (Customer Reviews)</span>
              </a>
            </div>

            <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black leading-tight mb-2.5">
              {product.name}
            </h1>

            {/* Price display & Color Information */}
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-black text-black">
                  {formatPrice(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-neutral-400 line-through font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {productColor && productColor !== 'Default' && (
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Color: <span className="font-black text-black">{productColor}</span>
                </div>
              )}
            </div>
          </div>

          {/* Variants / Size Selection */}
          {product.variants?.length > 0 && (
            <div className="border-t-2 border-black pt-4">
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider">Select Size</span>
                  {productColor && productColor !== 'Default' && (
                    <span className="text-xs text-neutral-400 font-bold uppercase">
                      (Color: <span className="text-black font-black">{productColor}</span>)
                    </span>
                  )}
                </div>

                {selectedVariant && (
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      selectedVariant.stock <= 0
                        ? 'text-red-600'
                        : selectedVariant.stock < 5
                        ? 'text-amber-600'
                        : 'text-neutral-500'
                    }`}
                  >
                    {selectedVariant.stock <= 0
                      ? 'Out of Stock'
                      : `Stock: ${selectedVariant.stock} units`}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.sku === v.sku;
                  const isOutOfStock = v.stock <= 0;

                  return (
                    <button
                      key={v.sku}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedVariant(v)}
                      className={`h-11 min-w-[48px] px-3.5 border-2 text-xs font-black uppercase tracking-wider transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]'
                          : isOutOfStock
                          ? 'border-neutral-200 text-neutral-300 cursor-not-allowed line-through'
                          : 'border-black bg-white text-black hover:bg-neutral-100'
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="border-t-2 border-black pt-4 space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border-2 border-black bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center font-black text-base hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-10 h-9 flex items-center justify-center font-black text-xs border-x-2 border-black bg-black text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center font-black text-base hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="w-full gap-2 h-12 text-xs font-black uppercase tracking-wider">
              <ShoppingBag className="h-4 w-4" /> Add To Shopping Bag
            </Button>
          </div>

          {/* Description & Highlights */}
          {product.description && (
            <div className="border-t-2 border-black pt-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-black mb-2">
                Product Details
              </h3>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {product.highlights?.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black">Highlights</h4>
              <ul className="space-y-1 text-xs text-neutral-600 font-medium">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-black flex-shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Chart Table */}
          {product.sizeChart?.length > 0 && (
            <div className="border-t-2 border-black pt-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-black mb-2">
                Dimension Guide (Inches)
              </h3>
              <div className="border-2 border-black overflow-x-auto">
                <table className="w-full text-[11px] font-bold text-center border-collapse">
                  <thead>
                    <tr className="bg-black text-white uppercase text-[10px]">
                      <th className="p-1.5 border border-black">Waist</th>
                      <th className="p-1.5 border border-black">Thigh</th>
                      <th className="p-1.5 border border-black">Leg Opening</th>
                      <th className="p-1.5 border border-black">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeChart.map((row, i) => (
                      <tr key={i} className="even:bg-neutral-50">
                        <td className="p-1.5 border border-black">{row.waist}</td>
                        <td className="p-1.5 border border-black">{row.thigh}</td>
                        <td className="p-1.5 border border-black">{row.legOpening}</td>
                        <td className="p-1.5 border border-black">{row.long}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 border-t-2 border-black pt-4 text-center">
            <div className="border border-neutral-200 p-2.5">
              <Truck className="h-4 w-4 mx-auto mb-1 text-black" />
              <p className="text-[9px] font-black uppercase">Fast Shipping</p>
            </div>
            <div className="border border-neutral-200 p-2.5">
              <RefreshCw className="h-4 w-4 mx-auto mb-1 text-black" />
              <p className="text-[9px] font-black uppercase">7-Day Exchange</p>
            </div>
            <div className="border border-neutral-200 p-2.5">
              <ShieldCheck className="h-4 w-4 mx-auto mb-1 text-black" />
              <p className="text-[9px] font-black uppercase">Genuine Denim</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern, Clean & Minimalistic Review Section */}
      <ProductReviews
        productId={product._id}
        productSlug={product.slug}
        productName={product.name}
      />
    </div>
  );
}
