import { registerApplication, start } from 'single-spa'
import { createStore } from './store/index.js'

window.store = createStore()

registerApplication(
  'angular',
  () => import('./angular/angular.app.ts'),
  () => location.pathname.startsWith('/')
)

registerApplication(
  'react',
  () => import('./react/react.app.tsx'),
  () => location.pathname.startsWith('/')
)

start()
