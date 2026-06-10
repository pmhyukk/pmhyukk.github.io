import { useState } from 'react'

function QnaForm({ editingPost, onSubmit, onCancel }) {
  const [category, setCategory] = useState(editingPost?.category ?? '상품문의')
  const [title, setTitle] = useState(editingPost?.title ?? '')
  const [author, setAuthor] = useState(editingPost?.author ?? '')
  const [content, setContent] = useState(editingPost?.content ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim() || !author.trim() || !content.trim()) return

    onSubmit({
      category,
      title: title.trim(),
      author: author.trim(),
      content: content.trim(),
    })

    setCategory('상품문의')
    setTitle('')
    setAuthor('')
    setContent('')
  }

  return (
    <form className="qna-form" onSubmit={handleSubmit}>
      <div className="qna-form-row">
        <label htmlFor="qna-category">문의 유형</label>
        <select id="qna-category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>상품문의</option>
          <option>배송문의</option>
          <option>교환/반품</option>
          <option>기타문의</option>
        </select>
      </div>

      <div className="qna-form-row">
        <label htmlFor="qna-title">제목</label>
        <input id="qna-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="문의 제목을 입력하세요" />
      </div>

      <div className="qna-form-row">
        <label htmlFor="qna-author">작성자</label>
        <input id="qna-author" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="작성자 이름" />
      </div>

      <div className="qna-form-row">
        <label htmlFor="qna-content">문의 내용</label>
        <textarea id="qna-content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="문의 내용을 입력하세요" />
      </div>

      <div className="qna-form-actions">
        {editingPost && <button type="button" className="button-secondary" onClick={onCancel}>수정 취소</button>}
        <button type="submit" className="button-primary">{editingPost ? '수정 완료' : '문의 등록'}</button>
      </div>
    </form>
  )
}

export default QnaForm
