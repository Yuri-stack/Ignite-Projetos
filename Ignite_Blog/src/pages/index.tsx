/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
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

  return (
    <>
      <Head>
        <title>SpaceTraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          {
            posts.map(post => (
              <Link href={`/post/${ post.uid }`}>
                <a key={ post.uid }>
                  <strong>{ post.data.title }</strong>
                  <p>{ post.data.subtitle }</p>

                  <div className={styles.info}>
                    <div>
                      <FiCalendar />
                      <time>{ post.first_publication_date }</time>
                    </div>
                    <div>
                      <FiUser />
                      { post.data.author }
                    </div>
                  </div>
                </a>
              </Link>
            ))
          }

          <p className={styles.button}>Carregar mais posts</p>

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query<any>([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['title', 'content'],
    pageSize: 3,
  });

  // console.log(JSON.stringify(postsResponse, null, 2))

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
      }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts
  }

  return {
    props: { postsPagination }
  }
};