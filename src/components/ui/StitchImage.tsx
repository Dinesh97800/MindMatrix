import Image from "next/image";

type StitchImageProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function StitchImage({
  src,
  alt = "",
  className,
  width = 1200,
  height = 800,
  priority = false,
}: StitchImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
    />
  );
}
