import { NgZone } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { singleSpaAngular } from 'single-spa-angular'
import 'zone.js'
import { AppModule } from './app.module'

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

const lifecycles = singleSpaAngular({
  bootstrapFunction: () => platformBrowserDynamic().bootstrapModule(AppModule),
  template: '<app-root></app-root>',
  NgZone,
  domElementGetter: () => getOrCreateRoot('angular'),
})

export const bootstrap = lifecycles.bootstrap
export const mount = lifecycles.mount
export const unmount = lifecycles.unmount
