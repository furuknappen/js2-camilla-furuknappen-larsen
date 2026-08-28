import { post } from "./apiClient";

// interface PostResponse {
//   data: {
//     id: string;
//     title: string;
//     body: string;
//   };
// }

// {
//   "data": {
//       "name": "camillalsa",
//       "email": "czsdjdfbajsd@stud.noroff.no",
//       "bio": null,
//       "avatar": {
//           "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
//           "alt": "A blurry multi-colored rainbow background"
//       },
//       "banner": {
//           "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
//           "alt": "A blurry multi-colored rainbow background"
//       }
//   },
//   "meta": {}
// }

interface RegisterResponse {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string
  };
  banner: {
    url: string;
    alt: string;
  }

}

export async function registerUser(registrationData: {}) {
   try {
    // Explicitly typing the generic with <PostResponse>
    const newPost = await post<RegisterResponse>('/auth/register', registrationData);
    
    if (newPost) {
      console.log('Post created successfully with ID:', newPost );
      // ... do something with new post
      return newPost
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error
    }
  }
}