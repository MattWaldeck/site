import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Reveal } from "@/components/Reveal";
import { NEWS_ARTICLES, getNewsArticle } from "@/lib/news";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  return { title: `${article.title} — RB & Son Transport`, description: article.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        <article className="news-article">
          <div className="wrap news-article-inner">
            <Reveal className="section-head">
              <span className="news-date">{article.dateLabel}</span>
              <h1>{article.title}</h1>
            </Reveal>
            <Reveal className="news-article-photo">
              <img src={article.coverImage} alt={article.coverImageAlt} />
              {article.coverImageIsIllustrative && (
                <span className="news-photo-note">Illustrative photo</span>
              )}
            </Reveal>
            <Reveal className="news-article-body">
              {article.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {article.quote && (
                <blockquote className="news-quote">
                  <p>&ldquo;{article.quote.text}&rdquo;</p>
                  <cite>— {article.quote.attribution}</cite>
                </blockquote>
              )}
            </Reveal>
            <Reveal>
              <a className="btn btn-outline-gold" href="/news">
                ← Back to news
              </a>
            </Reveal>
          </div>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
