import Image from "next/image";

type Props = {
  image: string | null;
  gradient: string[];
  className?: string;
  sizes?: string;
};

export default function ProjectThumb({ image, gradient, className = "", sizes = "96px" }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded border border-line ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${gradient.join(", ")})` }}
      aria-hidden
    >
      {image && <Image src={image} alt="" fill sizes={sizes} className="object-cover" />}
    </div>
  );
}
