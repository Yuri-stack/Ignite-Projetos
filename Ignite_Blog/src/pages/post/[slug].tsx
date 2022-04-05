/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { GetStaticPaths, GetStaticProps } from 'next';
import { Head } from 'next/document';

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

export default function Post() {
  return (
    <>
      <main className={styles.container}>
        <img className={styles.banner} src="/images/Banner.png" alt="Banner" />

        <article className={styles.post}>
          <h1>Como utilizar Hooks</h1>

          <div className={styles.info}>
            <div>
              <FiCalendar />
              <time>02 Abril 2022</time>
            </div>
            <div>
              <FiUser />
              Yuri O.
            </div>
            <div>
              <FiClock />
              4 min.
            </div>
          </div>

          <div className={styles.content}>
            <h2>Proin et varius</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate facilis illo voluptate nobis veniam fugit maxime sit repudiandae aperiam nisi cumque necessitatibus quas, corporis nulla debitis, voluptates, similique consequuntur quos?
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate facilis illo voluptate nobis veniam fugit maxime sit repudiandae aperiam nisi cumque necessitatibus quas, corporis nulla debitis, voluptates, similique consequuntur quos?
            </p>
          </div>
        </article>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
