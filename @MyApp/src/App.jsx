import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => {
        if (data.posts) {
          setPosts(data.posts);
        }
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <>
      <h1>Welcome to My Tumblr-like Blogging Website</h1>
      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author.username}</p>
            {/* Add more information as needed */}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
