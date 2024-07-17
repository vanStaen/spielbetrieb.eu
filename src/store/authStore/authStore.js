import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./deleteLogout.js";
import { postLogin } from "./postLogin.js";
import { getHasAccess } from "./getHasAccess.js";

export class AuthStore {
  hasAccess = false;

  constructor() {
    makeObservable(this, {
      hasAccess: observable,
      login: action,
      logout: action,
      setHasAccess: action,
      checkAccess: action,
    });
  }

  login = async (email, username, password, remind) => {
    if (!remind) {
      remind = false;
    }
    // Call login endpoint
    const hasAccess = await postLogin(email, username, password, remind);
    if (hasAccess.success) {
      this.setHasAccess(true);
    } else {
      return hasAccess.error;
    }
  };

  logout = async () => {
    // Call logout endpoint
    const resultLogOut = await deleteLogout();
    if (resultLogOut) {
      this.setHasAccess(false);
    }
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };

  checkAccess = async () => {
    const hasAccess = await getHasAccess();
    this.setHasAccess(hasAccess);
    return hasAccess;
  };
}

export const authStore = new AuthStore();
