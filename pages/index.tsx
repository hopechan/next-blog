import * as React from 'react';
import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';

import Link from '../components/Link';
import Navbar from '../components/Navbar';

import { getAllFilesFrontMatter } from '../lib/mdx';

type Props = {
  posts: {
    title: string
    slug: string
    image: string
  }[] // los corchetes indican que es un array
}

const Home: NextPage<Props> = ({posts}) =>{
  const [search, setSearch] = React.useState('');
  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <Head>
        <title>Mi Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Navbar/>
        <div className='container px-5 mx-auto'>
          <div className='relative w-full mb-4'>
            <input
              aria-labe='Buscar articulos' 
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Buscar articulos'
              className='px-4 py-2 border border-gray-300
              focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white text-gray-900 '
            />
            <svg
              className='absolute right-3 top-3 h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path 
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          {filteredPosts.map((post) =>(
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug} 
              className='block rounded border border-gray-200 p-4 hover:bg-gray-300'
            >
              <h3>{post.title}</h3>
            </Link>
          ))}
          </div>
      </main>

      <footer>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Hecho en casa
        </a>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("posts");

  return {
    props: {
      posts
    }
  }
}

export default Home;
