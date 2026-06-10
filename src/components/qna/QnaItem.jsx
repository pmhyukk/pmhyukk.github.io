function QnaItem({ post, isOpen, onOpen, onEdit, onDelete }) {
  return (
    <article className={`qna-item ${isOpen ? 'open' : ''}`}>
      <button type="button" className="qna-item-summary" onClick={() => onOpen(post.id)}>
        <span className="qna-number">{post.id}</span>
        <span className="qna-category">{post.category}</span>
        <strong>{post.title}</strong>
        <span>{post.author}</span>
        <span>{post.date}</span>
        <span>조회 {post.views}</span>
      </button>

      {isOpen && (
        <div className="qna-item-detail">
          <p>{post.content}</p>
          <div>
            <button type="button" onClick={() => onEdit(post)}>수정</button>
            <button type="button" onClick={() => onDelete(post.id)}>삭제</button>
          </div>
        </div>
      )}
    </article>
  )
}

export default QnaItem
