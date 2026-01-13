export function createStore() {
  let count = 0
  let language = 'en'
  const subscribers = new Set()

  const notify = () => {
    subscribers.forEach((fn) => fn())
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('store:change'))
    }
  }

  return {
    get count() {
      return count
    },
    get language() {
      return language
    },
    increment() {
      count++
      notify()
    },
    setLanguage(nextLanguage) {
      language = nextLanguage
      notify()
    },
    subscribe(fn) {
      subscribers.add(fn)
      return () => {
        subscribers.delete(fn)
      }
    },
  }
}
