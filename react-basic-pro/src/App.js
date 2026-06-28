import './App.scss'
import avatar from './images/bozai.png'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useRef } from 'react'
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'

// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]


function useCommentList() {
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    async function fetchCommentList() {
      // 模拟接口请求
      const res = await axios.get('http://localhost:3004/list')
      console.log('data', res.data)
      setCommentList(_.orderBy(res.data, ['like'], ['desc']))
    }
    fetchCommentList()
  }, [])

  return {commentList, setCommentList}
}


function Item( {item, onDeleteItem} ) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img
            className="bili-avatar-img"
            alt=""
            src={item.user.avatar}
          />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {item.user.uid === user.uid && 
              <span onClick={() => onDeleteItem(item.rpid)} className="delete-btn">
                删除
              </span>
            }
                                
          </div>
        </div>
      </div>
    </div>
  )
}


const App = () => {

  const {commentList, setCommentList} = useCommentList()
  const [tab, setTab] = useState('hot')
  const [content, setContent] = useState('')
  const contentTextAreaRef = useRef(null)

  function deleteItem(rmid) {
    setCommentList(commentList.filter(i => i.rpid !== rmid))
  }

  function tabChange(type) {
    setTab(type)
    // lodash
    if (type === 'hot') {

      // const newCommentList = [...commentList].sort((a, b) => {
      //   return a.like <= b.like ? 1 : -1
      // })
      const newCommentList = _.orderBy(commentList, ['like'], ['desc'])
      setCommentList(newCommentList)
    }

    if (type === 'time') {
      // const newCommentList = [...commentList].sort((a, b) => {
      //   return a.ctime <= b.ctime ? 1 : -1
      // })
      const newCommentList = _.orderBy(commentList, ['ctime'], 'desc')
      setCommentList(newCommentList)
    }
  }

  function publishComment() {
    /**
     * 添加评论内容
     * 1. 获取评论内容
     * 2. 验证评论内容
     * 3. 构造新的评论对象
     * 4. 添加到评论列表中
     */ 
    if (!content.trim()) {
      alert('请输入评论内容')
      return
    }
    
    const newComment = {
      rpid: uuidv4(),
      user,
      content,
      ctime: dayjs(new Date()).format('MM-DD HH:mm'),
      like: 0,
    }
    setCommentList(
      _.orderBy([newComment, ...commentList], ['like'], ['desc'])
    )
    setContent('')
    contentTextAreaRef.current.focus()
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{commentList.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => (<span key={item.type} className={classNames(`nav-item`, {active: tab === item.type})} onClick={() => tabChange(item.type)}>{item.text}</span>))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              ref={contentTextAreaRef}
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={publishComment}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map(item => <Item key={item.rpid} item={item} onDeleteItem={deleteItem} />)}

        </div>
      </div>
    </div>
  )
}

export default App