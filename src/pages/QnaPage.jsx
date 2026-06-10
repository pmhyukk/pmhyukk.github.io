import { useEffect, useMemo, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import QnaForm from '../components/qna/QnaForm'
import QnaList from '../components/qna/QnaList'
import '../styles/qna.css'

const initialPosts = [
  {
    id: 3,
    category: '상품문의',
    title: '마이티셔츠 사이즈 문의드립니다.',
    author: '김민수',
    content: '평소 100 사이즈를 입는데 세미오버핏은 어떤 사이즈를 선택하면 좋을까요?',
    date: '2026.06.08',
    views: 18,
  },
  {
    id: 2,
    category: '배송문의',
    title: '주문 후 배송은 얼마나 걸리나요?',
    author: '이서연',
    content: '오늘 주문하면 이번 주 안에 받을 수 있는지 궁금합니다.',
    date: '2026.06.07',
    views: 25,
  },
  {
    id: 1,
    category: '교환/반품',
    title: '온라인 주문 상품 교환 방법',
    author: '박지훈',
    content: '사이즈 교환을 원하는 경우 절차를 알려주세요.',
    date: '2026.06.06',
    views: 31,
  },
]

function QnaPage() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('fila-qna-posts')
    return savedPosts ? JSON.parse(savedPosts) : initialPosts
  })
  const [editingPost, setEditingPost] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('fila-qna-posts', JSON.stringify(posts))
  }, [posts])

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    if (!normalizedKeyword) return posts

    return posts.filter((post) =>
      `${post.category} ${post.title} ${post.author} ${post.content}`
        .toLowerCase()
        .includes(normalizedKeyword),
    )
  }, [keyword, posts])

  const handleSubmit = (formData) => {
    if (editingPost) {
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === editingPost.id ? { ...post, ...formData } : post,
        ),
      )
    } else {
      const nextId = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1
      const now = new Date()
      const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
      ].join('.')

      setPosts((currentPosts) => [
        { ...formData, id: nextId, date, views: 0 },
        ...currentPosts,
      ])
    }

    setEditingPost(null)
    setShowForm(false)
  }

  const handleOpen = (id) => {
    if (openId !== id) {
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === id ? { ...post, views: post.views + 1 } : post,
        ),
      )
    }
    setOpenId((currentId) => (currentId === id ? null : id))
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (!window.confirm('이 문의를 삭제하시겠습니까?')) return
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id))
    setOpenId(null)
  }

  const handleCancel = () => {
    setEditingPost(null)
    setShowForm(false)
  }

  return (
    <div className="qna-page">
      <Header />

      <main className="qna-main">
        <div className="qna-title-area">
          <div>
            <p>고객지원</p>
            <h1>Q&A</h1>
            <span>상품과 주문에 대해 궁금한 내용을 남겨주세요.</span>
          </div>
          <button type="button" className="button-primary" onClick={() => setShowForm((current) => !current)}>
            {showForm ? '목록 보기' : '문의 작성'}
          </button>
        </div>

        {showForm ? (
          <QnaForm key={editingPost?.id ?? 'new'} editingPost={editingPost} onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <>
            <div className="qna-toolbar">
              <strong>전체 문의 {posts.length}</strong>
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="제목, 내용, 작성자 검색" />
            </div>
            <QnaList posts={filteredPosts} openId={openId} onOpen={handleOpen} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default QnaPage
