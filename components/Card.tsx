import Image from 'next/image'
import React, { useState, useEffect } from 'react';

import Link from '../components/Link';

type CardProps = {
  post: {
    title: string,
    image: string,
    slug: string,
    tags: string
  }
}

export const Card = ({post}: CardProps) =>{
  const [tags, setTags] = useState<string[]>();

  useEffect(() =>{
    if (post.tags) {
      setTags(post.tags.split(','));
    }
  }, []);

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white'>
      <Image src={post.image} width='400' height='200' className='w-full'/>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2 text-color'>
          <Link href={`/blog/${post.slug}`}>
           {post.title}
          </Link>
        </div>
        <p className='text-gray-700 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        {
          tags?.map((tag, i) =>(
            <span className='inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2' key={i}>{`#${tag}`}</span>
          ))
        }
      </div>
    </div>
  );
}

export default Card;