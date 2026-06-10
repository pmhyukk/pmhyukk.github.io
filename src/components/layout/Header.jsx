import { NavLink } from 'react-router-dom'
import './Header.css'

const menuGroups = [
  {
    title: '의류',
    links: ['전체보기', '반팔', '바람막이/집업', '맨투맨/후디', '긴팔', '쇼츠', '팬츠', '트레이닝 셋업', '테니스', '러닝'],
  },
  {
    title: '신발',
    links: ['전체보기', '라이프스타일', '테니스', '러닝', '샌들/슬리퍼', '에샤페', '리트모', '하레핀', '인터런'],
  },
  {
    title: '용품',
    links: ['전체보기', '테니스', '피클볼', '백팩', '숄더/토트백', '메신저/크로스백', '슬링백/힙색', '모자', '양말', '기타'],
  },
  {
    title: '언더웨어',
    links: ['전체보기', 'BEST', '패키지', '쿨웨이브', '스포츠웨어', '드로즈', '트렁크', '파자마', '이지웨어', 'Accessories'],
  },
  {
    title: '스포츠',
    links: ['테니스', '러닝', '트레이닝', '피트니스', '피클볼'],
  },
]

function SubMenuGroup({ title, links }) {
  return (
    <div className="sub-menu-group">
      <strong>{title}</strong>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <NavLink to="/products">{link}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CategoryMenu({ name }) {
  return (
    <li className="category-item">
      <NavLink to="/products">{name}</NavLink>
      <div className="sub-menu-container">
        {menuGroups.map((group) => (
          <SubMenuGroup key={group.title} title={group.title} links={group.links} />
        ))}
      </div>
    </li>
  )
}

function Header() {
  return (
    <>
      <div className="coupon-banner">
        <span>FILA 카카오 플러스친구 추가 시 10% 무료</span>
        <button type="button" aria-label="쿠폰 배너 닫기">×</button>
      </div>

      <header className="site-header">
        <NavLink to="/" className="home-btn" aria-label="메인 페이지">
          <img src="/images/header-logo.png" alt="FILA" />
        </NavLink>

        <ul className="main-menu">
          {['Women', 'Men', 'Kids', 'Tennis', 'F.H.C'].map((name) => (
            <CategoryMenu key={name} name={name} />
          ))}
          <li className="qna-menu">
            <NavLink to="/qna">Q&A</NavLink>
          </li>
        </ul>

        <nav className="utility-menu">
          <NavLink to="/products" aria-label="매장 위치"><i className="fa-solid fa-map-location" /></NavLink>
          <NavLink to="/products" aria-label="검색"><i className="fa-solid fa-magnifying-glass" /></NavLink>
          <NavLink to="/qna" aria-label="사용자"><i className="fa-solid fa-user" /></NavLink>
          <NavLink to="/cart" aria-label="장바구니"><i className="fa-solid fa-bag-shopping" /></NavLink>
        </nav>
      </header>
    </>
  )
}

export default Header
