import Image from "next/image";
import type { ArticleImage } from "@/features/articles/lib/article-media";

export function ArticleFigure({ image, cover = false }: { image: ArticleImage; cover?: boolean }) {
  return (
    <figure className={cover ? "article-figure article-figure-cover" : "article-figure"}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={cover
          ? "(max-width: 620px) calc(100vw - 28px), (max-width: 1048px) calc(100vw - 48px), 1000px"
          : "(max-width: 620px) calc(100vw - 28px), (max-width: 918px) calc(88vw - 48px), 760px"}
        loading={cover ? "eager" : "lazy"}
      />
      <figcaption>
        <span className="article-figure-caption">{image.caption}</span>
        <small className="article-figure-credit">
          Image: {image.sourceUrl ? <a href={image.sourceUrl}>{image.credit}</a> : image.credit}
        </small>
      </figcaption>
    </figure>
  );
}
