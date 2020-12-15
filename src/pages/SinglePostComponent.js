import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => {
  return builder.image(source)
}



const SinglePostComponent = () => {
  const [postData, setPostData] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    sanityClient.fetch(
      `*[slug.current == $slug]{
        title,
        slug,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
        "name": author->name,
        "authorImage": author->image
      }`,
      { slug }
    )
    .then((data) => setPostData(data[0]))
    .catch(console.error)
  }, [slug])

  if(!postData) return <div>Loading...</div>

  return (
    <div>
      <div>
        <h2>{postData.title}</h2>
        <div>
          <img src={urlFor(postData.authorImage).width(100).url()} alt="Author is Jason Harris" />
          <h4>{postData.name}</h4>
        </div>
      </div>
      <img src={urlFor(postData.mainImage).width(200).url()} alt="Main Post Image" />
      <div>
        <BlockContent
          blocks={postData.body}
          projectId={sanityClient.clientConfig.projectId}
          dataset={sanityClient.clientConfig.dataset}
        />
      </div>
    </div>
  )
}

export default SinglePostComponent
