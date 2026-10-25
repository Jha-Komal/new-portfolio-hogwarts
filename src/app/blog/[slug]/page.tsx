import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import Tag from "@/components/Tag";
import blog from "@/data/blog.json";

export function generateStaticParams() {
  return blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blog.posts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Post", description: post?.excerpt };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <Page scroll>
      <PageHeader
        command={`cat ${post.slug}.md`}
        title={post.title}
        subtitle={`${post.date} · ${post.readingTime}`}
        back={{ href: "/#blog", label: "all posts" }}
      />
      <article className="rounded-lg border border-line bg-panel p-6 sm:p-10">
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-foreground/85">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </article>
    </Page>
  );
}
