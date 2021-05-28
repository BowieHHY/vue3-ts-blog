import { reactive } from "vue";
import { todayPost, thisWeek, thisMonth } from "@/mock";
import { Post } from "@/types";

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
const initialPostsState = (): PostsState => ({
  ids: [
    // todayPost.id.toString(),
    // thisWeek.id.toString(),
    // thisMonth.id.toString()
  ],
  all: {
    // [todayPost.id]: todayPost,
    // [thisWeek.id]: thisWeek,
    // [thisMonth.id]: thisWeek
  },
  loaded: false
})

interface State {
  posts: PostsState
}

const initialState = (): State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State
  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return this.state
  }
}

const store = new Store(initialState())

export const useStore = () => store