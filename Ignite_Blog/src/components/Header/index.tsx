/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import Link from 'next/link';

import styles from './header.module.scss'

export default function Header() {
  return (
    <header className = { styles.headerContainer }>
      <div className = { styles.headerContent }>
        <Link href="/">
          <img src="images/Logo.svg" alt="Logo" />
        </Link>
      </div>
    </header>
  )
}
