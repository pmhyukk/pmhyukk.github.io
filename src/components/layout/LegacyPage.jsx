import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './LegacyPage.css'

function LegacyPage({ src, title }) {
  const frameRef = useRef(null)
  const navigate = useNavigate()

  const connectNavigation = () => {
    const frame = frameRef.current
    const document = frame?.contentDocument

    if (!document) return

    document.title = title

    const menu = document.querySelector('.main_menu')
    if (menu && !menu.querySelector('.react-qna-link')) {
      menu.querySelectorAll(':scope > li > a').forEach((link) => {
        link.href = '/products'
        link.addEventListener('click', (event) => {
          event.preventDefault()
          navigate('/products')
        })
      })

      const item = document.createElement('li')
      const link = document.createElement('a')

      item.className = 'react-qna-link'
      link.href = '/qna'
      link.textContent = 'Q&A'
      link.addEventListener('click', (event) => {
        event.preventDefault()
        navigate('/qna')
      })

      item.appendChild(link)
      menu.appendChild(item)
    }

    const homeLink = document.querySelector('.home_btn')
    if (homeLink) {
      homeLink.href = '/'
      homeLink.addEventListener('click', (event) => {
        event.preventDefault()
        navigate('/')
      })
    }

    const cartLink = document.querySelector('.fa-bag-shopping')?.closest('a')
    if (cartLink) {
      cartLink.href = '/cart'
      cartLink.addEventListener('click', (event) => {
        event.preventDefault()
        navigate('/cart')
      })
    }

    const userLink = document.querySelector('.fa-user')?.closest('a')
    if (userLink) {
      userLink.href = '/qna'
      userLink.title = 'Q&A'
      userLink.addEventListener('click', (event) => {
        event.preventDefault()
        navigate('/qna')
      })
    }

    document.querySelectorAll('.product_item').forEach((item) => {
      item.style.cursor = 'pointer'
      item.addEventListener('click', (event) => {
        if (event.target.closest('button, select, .quick_add_container')) return
        navigate('/products/1')
      })
    })
  }

  return (
    <iframe
      ref={frameRef}
      className="legacy-frame"
      src={src}
      title={title}
      onLoad={connectNavigation}
    />
  )
}

export default LegacyPage
