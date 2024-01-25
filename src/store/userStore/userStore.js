import { action, makeObservable, observable } from 'mobx'

import { getHasAdminAccess } from './getHasAdminAccess'

export class UserStore {
  isLoading = false
  hasAdminAccess = false

  constructor () {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
      hasAdminAccess: observable,
      setHasAdminAccess: action,
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
}

export const userStore = new UserStore()
