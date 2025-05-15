import axios from "axios";

const API_URL = "http://localhost:8080/api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface PostRequest {
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  content: string;
}

export const register = (data: RegisterData) => {
  const { confirmPassword, ...registerData } = data as any;

  return axios.post(`${API_URL}/auth/signup`, registerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = (data: SignInData) => {
  return axios.post(`${API_URL}/auth/signin`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createPost = (postData: PostRequest, userId: number) => {
  return axios.post(`${API_URL}/posts?userId=${userId}`, postData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPostsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${category}`, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => {
        return status === 200 || status === 204;
      },
    });
    return response.status === 204 ? [] : response.data;
  } catch (error) {
    console.error(`Error fetching posts for category '${category}':`, error);
    throw error;
  }
};

export const getLikesByPostId = async (postId: number): Promise<number[]> => {
  const response = await axios.get<number[]>(
    `${API_URL}/posts/${postId}/likes`
  );
  return response.data;
};

export const getUsernamesByIds = async (userIds: number[]) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/auth/getUserNames",
      {
        params: {
          userIds: userIds.join(","),
        },
      }
    );
    return response.data.usernames;
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return [];
  }
};

export const getCommentsByPostId = async (
  postId: number
): Promise<{ userName: string; text: string }[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/posts/${postId}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
};

export const addComment = async (
  postId: number,
  userId: number,
  message: string
): Promise<void> => {
  try {
    await axios.post(
      `http://localhost:8080/api/posts/${postId}/comments`,
      { message },
      {
        params: { userId },
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
  } catch (err) {
    console.error("Error adding comment:", err);
    throw new Error("Failed to add comment");
  }
};

export const fetchPostsByUserId = async (userId: number): Promise<any[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/posts/user/${userId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error("Failed to fetch posts");
  }
};

export const deletePost = async (postId: any, userId: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/posts/${postId}?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (
  postId: any,
  userId: any,
  updatedData: any
) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/posts/${postId}?userId=${userId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:");
    throw error;
  }
};
