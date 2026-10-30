'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { trackViewContent, trackAddToCart } from '@/lib/fpixel';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product, ProductVariant } from '@/lib/api-types';

interface ProductClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductClient({ product, relatedProducts = [] }: ProductClientProps) {
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
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Main Image Zoom & Lightbox States
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [imageFit, setImageFit] = useState<'contain' | 'cover'>('contain');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : selectedImage
      ? [selectedImage]
      : [];
  const activeImageIndex =
    productImages.indexOf(selectedImage) >= 0 ? productImages.indexOf(selectedImage) : 0;

  const handlePrevImage = () => {
    if (productImages.length <= 1) return;
    const newIdx = (activeImageIndex - 1 + productImages.length) % productImages.length;
    setSelectedImage(productImages[newIdx]);
    setLightboxZoom(1);
  };

  const handleNextImage = () => {
    if (productImages.length <= 1) return;
    const newIdx = (activeImageIndex + 1) % productImages.length;
    setSelectedImage(productImages[newIdx]);
    setLightboxZoom(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setLightboxZoom(1);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, activeImageIndex, productImages]);

  const addItem = useCartStore((state) => state.addItem);

  const hasDiscount = Boolean(
    product.discountedPrice &&
      product.discountedPrice > 0 &&
      product.discountedPrice < product.price
  );
  const displayPrice = hasDiscount ? product.discountedPrice! : selectedVariant?.price || product.price;

  // Track Meta Pixel ViewContent event
  useEffect(() => {
    if (product?._id) {
      trackViewContent({
        id: product._id,
        name: product.name,
        category: product.category,
        price: displayPrice,
        currency: 'BDT',
      });
    }
  }, [product?._id, displayPrice]);

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

    // Track Meta Pixel AddToCart event
    trackAddToCart({
      id: product._id,
      name: product.name,
      price: displayPrice,
      quantity,
      currency: 'BDT',
    });

    toast.success(
      `"${product.name}"${itemColor !== 'Default' ? ` (${itemColor} / ${itemSize})` : ` (${itemSize})`} added to bag!`
    );
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-5 space-y-3 max-w-[460px] mx-auto w-full lg:max-w-none">
          <div className="relative aspect-[3/4] max-h-[580px] sm:max-h-[620px] w-full overflow-hidden border-2 border-black bg-neutral-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group">
            {selectedImage ? (
              <div
                className="relative w-full h-full overflow-hidden cursor-zoom-in"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={`transition-transform duration-150 ease-out ${
                    imageFit === 'contain' ? 'object-contain' : 'object-cover'
                  } ${isHovered ? 'scale-175' : 'scale-100'}`}
                  style={
                    isHovered
                      ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                      : undefined
                  }
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-400">
                No Image
              </div>
            )}

            {/* Special Offer Badge */}
            {hasDiscount && (
              <div className="absolute top-0 left-0 z-10 bg-amber-400 text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 sm:px-3.5 sm:py-1.5 border-b-2 border-r-2 border-black pointer-events-none">
                Special Offer
              </div>
            )}

            {/* Top Right Action Overlay (Fit/Fill + Fullscreen Zoom) */}
            {selectedImage && (
              <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                {/* Fit (Show Full Uncropped) vs Fill Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageFit((prev) => (prev === 'contain' ? 'cover' : 'contain'));
                  }}
                  className="bg-white/95 hover:bg-white text-black px-2 py-1 border-2 border-black text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  title={imageFit === 'contain' ? 'Switch to Fill frame' : 'Switch to Fit (Full image without crop)'}
                >
                  {imageFit === 'contain' ? 'Fit (Full)' : 'Fill'}
                </button>

                {/* Click for High-Res Lightbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="bg-white/95 hover:bg-white text-black px-2 py-1 border-2 border-black text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1 cursor-pointer"
                  title="Click to view full image in high resolution"
                >
                  <Maximize2 className="h-3 w-3" />
                  <span>Zoom</span>
                </button>
              </div>
            )}

            {/* Bottom Hover Hint */}
            {selectedImage && (
              <div className="absolute bottom-2 left-2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border border-black/50 hidden sm:block">
                Hover to zoom • Click for full screen
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-[72px] sm:w-16 sm:h-[84px] flex-shrink-0 border-2 overflow-hidden transition-all bg-neutral-50 cursor-pointer ${
                    selectedImage === img ? 'border-black ring-2 ring-black' : 'border-neutral-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i}`}
                    fill
                    sizes="(max-width: 640px) 56px, 64px"
                    loading="lazy"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                {product.category}
              </p>

              {/* Quick Reviews rating jump link */}
              <button
                type="button"
                onClick={() => {
                  setIsReviewsOpen(true);
                  setTimeout(() => {
                    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black hover:underline cursor-pointer group"
              >
                <div className="flex items-center text-amber-500 fill-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" />
                </div>
                <span className="group-hover:text-neutral-700">Customer Reviews</span>
                <span className="text-[9px] bg-neutral-100 group-hover:bg-black group-hover:text-white px-1.5 py-0.5 border border-black font-bold uppercase transition-colors">
                  {isReviewsOpen ? 'Open' : 'View'}
                </span>
              </button>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-black uppercase italic tracking-tight text-black leading-snug mb-2">
              {product.name}
            </h1>

            {/* Price display & Color Information */}
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="flex items-baseline gap-3">
                <span className="text-xl md:text-2xl font-black text-black">
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
            <div className="border-t border-black/15 pt-4">
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
                {product.variants.map((v, idx) => {
                  const isSelected =
                    selectedVariant?.sku === v.sku && selectedVariant?.size === v.size;
                  const isOutOfStock = v.stock <= 0;

                  return (
                    <button
                      key={`${v.sku}_${v.size}_${idx}`}
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
          <div className="border-t border-black/15 pt-4 space-y-3">
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
            <div className="border-t border-black/15 pt-4">
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
            <div className="border-t border-black/15 pt-4">
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
          <div className="grid grid-cols-3 gap-2 border-t border-black/15 pt-4 text-center">
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

      {/* ── RELATED / SIMILAR PRODUCTS SECTION ── */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="border-t border-black/15 pt-12 mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 border border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                  Curated For You
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black">
                Similar Pieces
              </h2>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Handcrafted styles and complementary essentials from our{' '}
                <span className="font-bold text-black uppercase">{product.category}</span> lineup.
              </p>
            </div>

            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 border-2 border-black bg-white text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all self-start sm:self-auto"
            >
              View All in {product.category}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.slice(0, 4).map((relProduct) => (
              <ProductCard key={relProduct._id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

      {/* ── CUSTOMER REVIEWS (COLLAPSIBLE / HIDDEN BY DEFAULT) ── */}
      <section id="reviews-section" className="border-t border-black/15 pt-12 mt-12 scroll-mt-6">
        <button
          type="button"
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-50 transition-all cursor-pointer group text-left"
          aria-expanded={isReviewsOpen}
        >
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest border border-black">
              VERIFIED REVIEWS
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-black uppercase tracking-wider">
                Customer Reviews & Verified Experiences
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto font-black text-xs uppercase tracking-wider border-2 border-black bg-neutral-100 group-hover:bg-black group-hover:text-white px-4 py-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span>{isReviewsOpen ? 'Hide Reviews' : 'Show Reviews'}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isReviewsOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {isReviewsOpen && (
          <div className="mt-6 border-2 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  Displaying Authenticated Customer Experiences
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewsOpen(false)}
                className="text-xs font-black uppercase tracking-wider text-neutral-500 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronUp className="h-4 w-4" /> Close Reviews
              </button>
            </div>

            <ProductReviews
              productId={product._id}
              productSlug={product.slug}
              productName={product.name}
              className="space-y-8"
              onClose={() => setIsReviewsOpen(false)}
            />
          </div>
        )}
      </section>

      {/* ── NATIVE FULLSCREEN IMAGE LIGHTBOX MODAL ── */}
      {isLightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setIsLightboxOpen(false);
            setLightboxZoom(1);
          }}
        >
          {/* Top Controls Bar */}
          <div
            className="flex items-center justify-between text-white border-b border-white/20 pb-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400">
                {product.name}
              </p>
              <p className="text-[10px] text-neutral-400 font-mono uppercase mt-0.5">
                Image {activeImageIndex + 1} of {productImages.length} • Click image to zoom ({lightboxZoom}x)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxZoom((prev) => (prev === 1 ? 2 : 1))}
                className="px-3 py-1.5 bg-neutral-900 border border-white/30 text-white hover:bg-white hover:text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {lightboxZoom === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
                <span>{lightboxZoom === 1 ? 'Zoom 2x' : 'Reset'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setLightboxZoom(1);
                }}
                className="p-1.5 sm:p-2 bg-white text-black hover:bg-amber-400 border border-white transition-colors cursor-pointer"
                title="Close Fullscreen (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Viewport */}
          <div
            className="relative flex-1 flex items-center justify-center overflow-hidden my-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {productImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-6 z-30 p-2.5 sm:p-3 bg-black/80 hover:bg-black text-white border border-white/30 hover:border-white transition-all shadow-lg cursor-pointer"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* The Big Image with high-res object-contain */}
            <div
              className={`relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center transition-transform duration-200 ${
                lightboxZoom === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'
              }`}
              onClick={() => setLightboxZoom((prev) => (prev === 1 ? 2 : 1))}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="95vw"
                className={`object-contain transition-transform duration-300 ${
                  lightboxZoom === 2 ? 'scale-150 sm:scale-175' : 'scale-100'
                }`}
                priority
              />
            </div>

            {/* Next Button */}
            {productImages.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 sm:right-6 z-30 p-2.5 sm:p-3 bg-black/80 hover:bg-black text-white border border-white/30 hover:border-white transition-all shadow-lg cursor-pointer"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {productImages.length > 1 && (
            <div
              className="flex justify-center items-center gap-2 overflow-x-auto pt-3 border-t border-white/20 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImage(img);
                    setLightboxZoom(1);
                  }}
                  className={`relative w-12 h-16 sm:w-14 sm:h-18 flex-shrink-0 border-2 overflow-hidden transition-all bg-black cursor-pointer ${
                    selectedImage === img
                      ? 'border-amber-400 ring-2 ring-amber-400 scale-105'
                      : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i}`}
                    fill
                    sizes="(max-width: 640px) 56px, 64px"
                    loading="lazy"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
