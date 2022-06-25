import { Header } from "./components/Header";
import { Post } from "./Post";

import './global.css'

export function App() {
  return (
    <>
      <Header />

      <Post
        author="Yuri"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consequatur? Facere blanditiis aperiam enim alias eligendi, pariatur recusandae accusantium soluta asperiores facilis, dolores temporibus optio doloremque, ratione sit iusto dolor!"
      />

      <Post
        author="Yssac"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consequatur? Facere blanditiis aperiam enim alias eligendi, pariatur recusandae accusantium soluta asperiores facilis, dolores temporibus optio doloremque, ratione sit iusto dolor!2"
      />
    </>
  )
}