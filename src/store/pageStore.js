import { action, makeObservable, observable } from 'mobx'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export class PageStore {
  selectedTheme = cookies.get('selectedTheme')
  selectedLanguage = cookies.get('selectedLanguage') || 'en'
  allowCookie = cookies.get('allowCookie')

  constructor () {
    makeObservable(this, {
      selectedTheme: observable,
      setSelectedTheme: action,
      selectedLanguage: observable,
      setSelectedLanguage: action,
      allowCookie: observable,
      setAllowCookie: action
    })
  }

  setSelectedTheme = (selectedTheme) => {
    this.selectedTheme = selectedTheme
    if (this.allowCookie) {
      cookies.set('selectedTheme', selectedTheme, { path: '/' })
    }
  }

  setSelectedLanguage = (selectedLanguage) => {
    this.selectedLanguage = selectedLanguage
    if (this.allowCookie) {
      cookies.set('selectedLanguage', selectedLanguage, { path: '/' })
    }
  }

  setAllowCookie = (allowCookie) => {
    this.allowCookie = allowCookie
    if (allowCookie) {
      cookies.set('allowCookie', true, { path: '/' })
    }
  }
}

export const pageStore = new PageStore()
