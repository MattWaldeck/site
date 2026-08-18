import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { NEWS_ARTICLES } from "@/lib/news";

export const metadata = {
  title: "News — RB & Son Transport",
  description: "News and community stories from RB & Son Transport.",
};

export default function NewsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        <section className="news-page">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">News</p>
              <h2>Stories from the road</h2>
            </Reveal>
            <RevealGroup className="news-grid">
              {NEWS_ARTICLES.map((article) => (
                <RevealItem className="news-card" key={article.slug}>
                  <a href={`/news/${article.slug}`}>
                    <div className="news-card-photo">
                      <img src={article.coverImage} alt={article.coverImageAlt} loading="lazy" />
                    </div>
                    <div className="news-card-body">
                      <span className="news-date">{article.dateLabel}</span>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
