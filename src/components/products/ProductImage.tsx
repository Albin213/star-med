import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Catalogue photos come in every shape and background. Showing each one whole over
 * its own blurred copy keeps the full packaging visible and the grid looking uniform.
 */
export function ProductImage({ src, alt, sizes, priority, className = "" }: ProductImageProps) {
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="96px"
        aria-hidden
        className="scale-110 object-cover blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
      />
    </div>
  );
}
