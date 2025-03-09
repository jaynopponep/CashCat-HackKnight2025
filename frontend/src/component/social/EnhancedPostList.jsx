// import React, { useState } from 'react';
// import PostCard from './PostCard';
//
// const EnhancedPostList = () => {
//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       user: {
//         name: 'Ari Hernandez',
//         handle: '@arifinance',
//         avatar: 'AH'
//       },
//       content: '💸 Monthly budget review complete!',
//       category: 'Budgeting',
//       likes: 24,
//       comments: 8,
//       timestamp: '1d'
//     },
//     {
//       id: 2,
//       user: {
//         name: 'Jay P',
//         handle: '@jayp_finance',
//         avatar: 'JP'
//       },
//       content: 'Coffee ☕',
//       category: 'Expenses',
//       likes: 31,
//       comments: 12,
//       timestamp: '2d'
//     },
//     {
//       id: 3,
//       user: {
//         name: 'Naitik Gupta',
//         handle: '@naitikfinance',
//         avatar: 'NG'
//       },
//       content: 'Tix 🎟️',
//       category: 'Entertainment',
//       likes: 42,
//       comments: 15,
//       timestamp: '3d'
//     },
//     {
//       id: 4,
//       user: {
//         name: 'Ved Parikh',
//         handle: '@vedmoney',
//         avatar: 'VP'
//       },
//       content: 'Split the bill',
//       category: 'Food',
//       likes: 17,
//       comments: 3,
//       timestamp: 'Feb 10'
//     },
//     {
//       id: 5,
//       user: {
//         name: 'Ari Hernandez',
//         handle: '@arifinance',
//         avatar: 'AH'
//       },
//       content: '⚡ Utilities',
//       category: 'Bills',
//       likes: 9,
//       comments: 2,
//       timestamp: 'Feb 8'
//     },
//     {
//       id: 6,
//       user: {
//         name: 'Raunak Chitre',
//         handle: '@raunakbudgets',
//         avatar: 'RC'
//       },
//       content: 'Weeknd tickets 🎵',
//       category: 'Entertainment',
//       likes: 29,
//       comments: 14,
//       timestamp: 'Feb 5'
//     },
//     {
//       id: 7,
//       user: {
//         name: 'Walter White',
//         handle: '@waltfinance',
//         avatar: 'WW'
//       },
//       content: 'Car wash',
//       category: 'Business',
//       likes: 41,
//       comments: 7,
//       timestamp: 'Feb 3'
//     },
//     {
//       id: 8,
//       user: {
//         name: 'Skyler White',
//         handle: '@skylerbudgets',
//         avatar: 'SW'
//       },
//       content: 'Groceries 🛒',
//       category: 'Food',
//       likes: 16,
//       comments: 5,
//       timestamp: 'Feb 2'
//     },
//     {
//       id: 9,
//       user: {
//         name: 'Flynn White',
//         handle: '@youngmoney',
//         avatar: 'FW'
//       },
//       content: 'Breakfast! 🥞',
//       category: 'Food',
//       likes: 22,
//       comments: 3,
//       timestamp: 'Jan 31'
//     }
//   ]);
//
//   const handleLike = (postId) => {
//     // Do nothing - likes handled in PostCard component
//   };
//
//   const renderGap = () => (
//     <div className="my-8 flex items-center justify-center">
//       <div className="w-1/3 h-px bg-gray-200"></div>
//       <div className="mx-4 text-gray-400 text-sm">∙∙∙</div>
//       <div className="w-1/3 h-px bg-gray-200"></div>
//     </div>
//   );
//
//   return (
//     <div className="px-4 pb-16 pt-4 flex justify-center">
//       <div className="w-full max-w-lg">
//         {posts.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">
//             No transactions yet.
//           </div>
//         ) : (
//           <>
//             {posts.map((post, index) => (
//               <React.Fragment key={post.id}>
//                 <PostCard
//                   post={post}
//                   onLike={handleLike}
//                 />
//                 {index < posts.length - 1 && renderGap()}
//               </React.Fragment>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default EnhancedPostList;
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

const BASEURL = "http://127.0.0.1:5000"; // Update with actual backend URL

const EnhancedPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASEURL}/get_posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Error fetching posts:", data);
          return;
        }

        const formattedPosts = data.map((post, index) => ({
          id: index,
          user: {
            name: post.username || "AAA",
            handle: "@AAA",
            avatar: post.username ? post.username.charAt(0).toUpperCase() + post.username.charAt(1).toUpperCase() : "AA",
          },
          content: post.content || "AAA",
          category: post.category || "AAA",
          likes: 0,
          comments: 0,
          timestamp: "AAA"
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error retrieving posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId) => {
    // Do nothing for now - handled inside PostCard
  };

  const renderGap = () => (
      <div className="my-8 flex items-center justify-center">
        <div className="w-1/3 h-px bg-gray-200"></div>
        <div className="mx-4 text-gray-400 text-sm">∙∙∙</div>
        <div className="w-1/3 h-px bg-gray-200"></div>
      </div>
  );

  return (
      <div className="px-4 pb-16 pt-4 flex justify-center">
        <div className="w-full max-w-lg">
          {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No transactions yet.
              </div>
          ) : (
              <>
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <PostCard
                          post={post}
                          onLike={handleLike}
                      />
                      {index < posts.length - 1 && renderGap()}
                    </React.Fragment>
                ))}
              </>
          )}
        </div>
      </div>
  );
};

export default EnhancedPostList;
