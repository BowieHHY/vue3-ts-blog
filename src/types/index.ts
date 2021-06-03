import { Moment } from 'moment'

export type Period = '今天' | '本周' | '本月'
export interface Post {
  id: number;
  title: string;
  markdown: string;
  html: string;
  authorId: number;
  createDate: Moment;
}

export type Role = '用户' | '游客'
export interface User {
  id: number;
  username: string;
  email?: string;
  password: string | number;
  password2?: string;
  role?: string;
}