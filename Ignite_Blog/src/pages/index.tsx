/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { GetStaticProps } from 'next';
import Link from 'next/link';

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

export default function Home() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.posts}>

          <Link href="/post/como-utilizar-hooks">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>

              <div className={styles.info}>
                <div>
                  <FiCalendar />
                  <time>02 Abril 2022</time>
                </div>
                <div>
                  <FiUser />
                  Yuri O.
                </div>
              </div>
            </a>
          </Link>

          <Link href="/">
            <a>
              <strong>Criando um app CRA do zero</strong>
              <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>

              <div className={styles.info}>
                <div>
                  <FiCalendar />
                  <time>02 Abril 2022</time>
                </div>
                <div>
                  <FiUser />
                  Yuri O.
                </div>
              </div>
            </a>
          </Link>

          <p className={ styles.button }>Carregar mais posts</p>

        </div>
      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
