import Styles from "../pages/styles/card.module.css"

const cardIntersectionObserver = () => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "-100px",
    threshold: 0
  }

  const observer = new IntersectionObserver(doWhenIntersect, options)

  const elements = document.querySelectorAll<HTMLElement>(`.${Styles.card}`)

  elements.forEach((element: Element) => {
    observer.observe(element)
  })

  function doWhenIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        addShowClass(entry.target)
      }
    })
  }

  function addShowClass(element: Element) {
    element?.classList.add(Styles.show)
  }
}

export default cardIntersectionObserver

