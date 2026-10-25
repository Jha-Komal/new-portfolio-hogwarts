import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Tag from "@/components/Tag";
import blog from "@/data/blog.json";

export default function BlogSection() {
  return (
    <Section id="blog">
      <PageHeader command="ls ./blog" title={blog.title} subtitle={blog.subtitle} />
      <ul className="space-y-3">
        {blog.posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-line bg-panel p-5 transition-colors hover:border-green/60"
            >
              <p className="text-xs text-muted">
                {post.date} · {post.readingTime}
              </p>
              <h2 className="mt-1 text-lg text-amber">{post.title}</h2>
              <p className="mt-2 text-sm text-foreground/80">{post.excerpt}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
