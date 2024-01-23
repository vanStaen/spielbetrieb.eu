import { action, makeObservable, observable } from 'mobx'
import Cookies from 'universal-cookie'

import { getHasAdminAccess } from './getHasAdminAccess'

const cookies = new Cookies()

export class AdminStore {
  hasAdminAccess = false
  selectedPage = cookies.get('selectedPage') || 'newsletter'

  constructor () {
    makeObservable(this, {
      hasAdminAccess: observable,
      setHasAdminAccess: action,
      pinLogin: action,
      selectedPage: observable,
      setSelectedPage: action
    })
  }

  setHasAdminAccess = (hasAdminAccess) => {
    this.hasAdminAccess = hasAdminAccess
  }

  checkAdminAccess = async () => {
    const hasAdminAccess = await getHasAdminAccess()
    this.setHasAdminAccess(hasAdminAccess)
  }

  pinLogin = (pin) => {
    if (pin === '555666') {
      this.setHasAdminAccess(true)
    }
  }

  setSelectedPage = (selectedPage) => {
    this.selectedPage = selectedPage
    cookies.set('selectedPage', selectedPage, { path: '/' })
  }
}

export const adminStore = new AdminStore()
