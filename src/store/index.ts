import { reactive } from "vue";
import { todayPost, thisWeek, thisMonth } from "@/mock";
import { Post, User } from "@/types";
import axios from 'axios'

/**
 * posts: {
 *  1: { id:q,title:'xxx',...}
 * }
 */

interface PostsState {
  ids: string[];
  all: Record<string, Post>;
  loaded: boolean;
}

interface LoginUserState {
  ids: string[];
  all: Record<string, Post>;
  loaded: boolean;
  currentUserId?: string;
}
const initialPostsState = (): PostsState => ({
  ids: [
    // todayPost.id.toString(),
    // thisWeek.id.toString(),
    // thisMonth.id.toString()
  ],
  all: {
    // [todayPost.id]: todayPost,
    // [thisWeek.id]: thisWeek,
    // [thisMonth.id]: thisMonth
  },
  loaded: false
})

const initialUserState = (): LoginUserState => ({
  ids: [],
  all: {},
  loaded: false,
  currentUserId: undefined,
})

interface State {
  posts: PostsState,
  loginUser: LoginUserState
}

const initialState = (): State => ({
  posts: initialPostsState(),
  loginUser: initialUserState()
})

class Store {
  protected state: State
  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return this.state
  }

  async fetchPosts() {
    const res = await axios.get<Post[]>("/posts");
    // 处理数据
    // const ids: string[] = []
    // const all: Record<string, Post> = {}
    for (const post of res.data) {
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString())
        this.state.posts.all[post.id] = post
      }
    }

    this.state.posts.loaded = true;

  }

  async createPost(post: Post) {
    const response = await axios.post<Post>("/posts", post)
    console.log('createPost', response)
    this.state.posts.all[response.data.id] = response.data
    this.state.posts.ids.push(response.data.id.toString())
  }
  async updatePost(post: Post) {
    const response = await axios.put<Post>("/posts", post)
    console.log('updatePost', response)
    this.state.posts.all[response.data.id] = response.data
  }

  async createUser(user: User) {
    const response = await axios.post<Post>("/users", user);
    this.state.loginUser.all[response.data.id] = response.data;
    this.state.loginUser.ids.push(response.data.id.toString());
    this.state.loginUser.currentUserId = response.data.id.toString();
  }
  async signOut() {
    this.state.loginUser.currentUserId = undefined;
  }
}

const store = new Store(initialState())

export const useStore = () => store