import { getAllBlogPosts, getAllTopics } from "../../Lib/Data";
import { serialize } from "next-mdx-remote/serialize";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Head from "next/head";
import BlogInner from "../../Components/BlogInner";
import BlogShare from "../../Components/BlogShare";
import Comments from "../../Components/Comments";
import { SWRConfig } from "swr";
import { remarkHeadingId } from "remark-custom-heading-id";
import { getHeadings } from "../../Lib/GetHeadings";
import LikeBtn from "../../Components/LikeBtn";

export const getStaticPaths = () => {
  try {
    const allBlogs = getAllBlogPosts();
    return {
      paths: allBlogs.map((blog) => ({
        params: {
          id: String(blog.data.Title.split(" ").join("-").toLowerCase()),
        },
      })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async (context) => {
  try {
    const params = context.params;
    const allBlogs = getAllBlogPosts();
    const allTopics = getAllTopics();

    const page = allBlogs.find(
      (blog) =>
        String(blog.data.Title.split(" ").join("-").toLowerCase()) === params.id
    );

    if (!page) {
      return {
        notFound: true,
      };
    }

    const { data, content } = page;

    if (!content || typeof content !== "string") {
      console.error("Invalid MDX content for blog:", params.id);
      return {
        notFound: true,
      };
    }

    const mdxSource = await serialize(content, {
      scope: data,
      mdxOptions: { remarkPlugins: [remarkHeadingId] },
    });

    const headings = await getHeadings(content);

    const headerImage = data.HeaderImage
      ? `https://raw.githubusercontent.com/Sephens/Code-Crumbs/main/public${data.HeaderImage}`
      : "https://example.com/default-image.jpg";

    return {
      props: {
        data: data,
        content: mdxSource,
        id: params.id,
        headings: headings,
        topics: allTopics,
        headerImage: headerImage,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};

function id({ data, content, id, headings, topics, headerImage }) {
  return (
    <>
      <Head>
        <title>{data.Title}</title>
        <meta name="title" content={data.Title} />
        <meta name="description" content={data.Abstract} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogs.sephens.tech/" />
        <meta property="og:title" content={data.Title} />
        <meta property="og:description" content={data.Abstract} />
        <meta property="og:image" content={headerImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blogs.sephens.tech/" />
        <meta property="twitter:title" content={data.Title} />
        <meta property="twitter:description" content={data.Abstract} />
        <meta property="twitter:image" content={headerImage} />
      </Head>

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />
        <div className="py-24">
          <BlogInner data={data} content={content} headings={headings} />
          <LikeBtn id={id} />
          <BlogShare data={data} />

          <SWRConfig>
            <Comments id={id} />
          </SWRConfig>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default id;