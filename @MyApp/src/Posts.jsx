import React from 'react';

function Post({ post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author.username}</p>
      
    </div>
  );
}

export default Post;
