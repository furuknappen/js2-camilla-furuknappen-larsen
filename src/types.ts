export type Post = {
  author: Author;
  body: string;
  comments?: Comment[];
  created: string;
  id: number;
  media: {
    alt: string;
    url: string;
  };
  reactions: Reaction[];
  tags: [];
  title: string;
  updated: string;
  _count: {
    comments: number;
    reactions: number;
  };
};

export type Meta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number;
  pageCount: number;
  totalCount: number;

};

export type Author = {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: {
    url: string;
    alt: string;
  };
};

export type Avatar = {
  url: string;
  alt: string;
};

export type Comment = {
  author: Author;
  body: string;
  replyToId: null;
  id: number;
  postId: number;
  owner: string;
  created: string;
};

export type Reaction = {
  count: number;
  reactors: string[];
  symbol: string;
};






