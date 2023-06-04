import Styles from "../pages/styles/card.module.css"

const elementIntersectionObserver = () => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "-30px",
    threshold: 0
  }

  const observer = new IntersectionObserver(doWhenIntersect, options)

  const elements = document.querySelectorAll<HTMLElement>(`.inter`)

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
    element?.classList.add("show")
  }
}

export default elementIntersectionObserver

