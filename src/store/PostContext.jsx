//src/store/postContent.jsx
import React, { createContext, useState } from 'react';

export const PostContext = createContext();

function Post({ children }) {
    const [postDetails, setPostDetails] = useState(null);
    return (
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
            {children}
        </PostContext.Provider>
    );
}

export default Post;
