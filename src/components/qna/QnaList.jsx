import QnaItem from './QnaItem'

function QnaList({ posts, openId, onOpen, onEdit, onDelete }) {
  if (posts.length === 0) {
    return <p className="qna-empty">등록된 문의가 없습니다.</p>
  }

  return (
    <section className="qna-list">
      <div className="qna-list-head">
        <span>번호</span>
        <span>유형</span>
        <span>제목</span>
        <span>작성자</span>
        <span>작성일</span>
        <span>조회</span>
      </div>

      {posts.map((post) => (
        <QnaItem
          key={post.id}
          post={post}
          isOpen={openId === post.id}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}

export default QnaList
