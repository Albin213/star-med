import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Catalogue photos come in every shape and background. Each one sits whole over a dimmed,
 * blurred copy of itself plus a cyan core glow, so the grid stays uniform on the dark theme.
 */
export function ProductImage({ src, alt, sizes, priority, className = "" }: ProductImageProps) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="96px"
        aria-hidden
        className="scale-125 object-cover opacity-20 blur-2xl"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(23,54,140,0.072),transparent_60%)]" />
      <div aria-hidden className="grid-dots absolute inset-0 opacity-25" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-[6%] drop-shadow-[0_20px_30px_rgba(14,26,54,0.165)] transition-transform duration-700 ease-premium group-hover:-translate-y-1 group-hover:scale-[1.07]"
      />
    </div>
  );
}
