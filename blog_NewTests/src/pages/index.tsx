/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results)
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page)

  useEffect(() => {
    setPosts(postsPagination.results)
    setNextPage(postsPagination.next_page)
  }, [postsPagination])

  const loadPosts = async (): Promise<void> => {
    if (nextPage) {
      fetch(nextPage)
        .then(resp => resp.json())
        .then(data => {

          const newPosts = data.results.map((post: Post) => ({
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: post.data.author,
            },
          }))

          setNextPage(data.nextPage)
          setPosts([...posts, ...newPosts])
        })
        .catch(() => {
          console.error('Error fecthing new page.');
        });
    }
  }

  return (
    <>
      <Head>
        <title>SpaceTraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          {

            posts.map(post => (
              <Link href={`/post/${post.uid}`} key={post.uid}>
                <article>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>

                  <div className={styles.info}>
                    <div>
                      <FiCalendar />
                      <time>{format(new Date(post.first_publication_date), 'dd MMM yyyy', { locale: ptBR })}</time>
                    </div>
                    <div>
                      <FiUser />
                      {post.data.author}
                    </div>
                  </div>
                </article>
              </Link>
            ))
          }

          {
            nextPage && (
              <button onClick={() => loadPosts()} type="button">
                <p className={styles.button}>Carregar mais posts</p>
              </button>
            )
          }

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('post', {
    fetch: ['post.title', 'post.subtitle', 'post.author'],
    pageSize: 1,
  });

  // const posts: Post[] = postsResponse.results.map(
  //   (post): Post => ({
  //     uid: post.uid,
  //     first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
  //       day: '2-digit', month: 'long', year: 'numeric'
  //     }),
  //     data: {
  //       title: post.data.title,
  //       subtitle: post.data.subtitle,
  //       author: post.data.author
  //     }
  //   }))

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postsResponse.results
      }
    },
    revalidate: 60 * 60
  }
};