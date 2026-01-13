import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import App from './App'

const getOrCreateRoot = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    return element
  }

  const fallback = document.createElement('div')
  fallback.id = id
  document.body.appendChild(fallback)
  return fallback
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => getOrCreateRoot('react'),
  suppressComponentDidCatchWarning: true,
})

export const bootstrap = [reactLifecycles.bootstrap]
export const mount = [reactLifecycles.mount]
export const unmount = [reactLifecycles.unmount]
