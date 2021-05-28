import moment from "moment";
import { Post } from '@/types'

export const basePost: Post = {
  id: 1,
  title: 'vue3+ts',
  markdown: 'list',
  html: `<p>list</p>`,
  authorId: 1,
  createDate: moment()
}

export const todayPost: Post = {
  ...basePost,
  id: 1,
  title: '今天'
}

export const thisWeek: Post = {
  ...basePost,
  id: 2,
  title: '本周',
  createDate: moment().subtract(2, 'days')
}

export const thisMonth = {
  ...basePost,
  id: 3,
  title: '本月',
  createDate: moment().subtract(2, 'weeks')
}