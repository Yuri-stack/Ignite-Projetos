/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-param-reassign */

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const { isFallback } = useRouter()

  const readingRate = post.data.content.reduce((acc, content) => {
    function readTime(text: string): number{
      return text.split(' ').length
    }

    acc += readTime(content.heading) / 200
    acc += readTime(RichText.asText(content.body)) / 200

    return Math.ceil(acc);

    // const contentNumber = content.heading.split(' ').length
    // const bodyNumber = RichText.asText(content.body).split(' ').length

    // const readTime = (contentNumber + bodyNumber)/200
    // acc += readTime
    // return Math.ceil(acc);
  }, 0)

  return isFallback ? (
    <div>Carregando...</div>
  ) : (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>

      <main className={styles.container}>
        <img className={styles.banner} src={post.data.banner.url} alt="Banner" />

        <article className={styles.post}>
          <h1>{post.data.title}</h1>

          <div className={styles.info}>
            <div>
              <FiCalendar />
              <time>{format(new Date(post.first_publication_date), 'dd MMM yyyy', { locale: ptBR })}</time>
            </div>
            <div>
              <FiUser />
              {post.data.author}
            </div>
            <div>
              <FiClock />
              { readingRate } min
            </div>
          </div>

          {post.data.content.map(content => (
            <div key={content.heading} className={styles.content}>
              <h2>{content.heading}</h2>
              <div dangerouslySetInnerHTML={{
                __html: RichText.asHtml(content.body)
              }} />
            </div>
          ))}

        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});

  const posts = await prismic.getByType('posts', {
    pageSize: 50,
  });

  const paths = posts.results.map(result => ({
    params: {
      slug: result.uid, 
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient({});
  const { slug } = context.params

  const response = await prismic.getByUID('post', String(slug), {});

  // const post = {
  //   first_publication_date: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
  //     day: '2-digit', month: 'long', year: 'numeric'
  //   }),
  //   data: {
  //     title: response.data.title,
  //     banner: response.data.banner,
  //     author: response.data.author,
  //     content: response.data.content
  //   }
  // }

  return {
    props: { post: response },
    revalidate: 60 * 60 * 24 // 24 horas
  }

};