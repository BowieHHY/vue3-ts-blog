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
  title: '今天'
}

export const thisWeek: Post = {
  ...basePost,
  title: '本周',
  createDate: moment().subtract(2, 'days')
}

export const thisMonth = {
  ...basePost,
  title: '本月',
  createDate: moment().subtract(2, 'weeks')
}