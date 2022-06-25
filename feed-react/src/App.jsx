import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        
        <main>
          <Post
            author="Yuri"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consequatur? Facere blanditiis aperiam enim alias eligendi, pariatur recusandae accusantium soluta asperiores facilis, dolores temporibus optio doloremque, ratione sit iusto dolor!"
          />

          <Post
            author="Yssac"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consequatur? Facere blanditiis aperiam enim alias eligendi, pariatur recusandae accusantium soluta asperiores facilis, dolores temporibus optio doloremque, ratione sit iusto dolor!2"
          />
        </main>
      </div>
    </>
  )
}