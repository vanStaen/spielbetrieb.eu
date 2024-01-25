import { action, makeObservable, observable } from 'mobx'
import Cookies from 'universal-cookie'

import { getHasAdminAccess } from './getHasAdminAccess'

const cookies = new Cookies()

export class AdminStore {
  isLoading = false
  hasAdminAccess = false
  selectedPage = cookies.get('selectedPage') || 'newsletter'

  constructor () {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
      hasAdminAccess: observable,
      setHasAdminAccess: action,
      selectedPage: observable,
      setSelectedPage: action
    })
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading
  }

  setHasAdminAccess = (hasAdminAccess) => {
    this.hasAdminAccess = hasAdminAccess
  }

  checkAdminAccess = async () => {
    this.setIsLoading(true)
    const hasAdminAccess = await getHasAdminAccess()
    this.setHasAdminAccess(hasAdminAccess)
    this.setIsLoading(false)
  }

  setSelectedPage = (selectedPage) => {
    this.selectedPage = selectedPage
    cookies.set('selectedPage', selectedPage, { path: '/' })
  }
}

export const adminStore = new AdminStore()
