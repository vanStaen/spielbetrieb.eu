import { action, makeObservable, observable } from "mobx";

export class PartnerStore {
  isLoading = true;
  id = null;
  avatarUrl = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
      id: observable,
      setid: action,
      avatarUrl: observable,
      setAvatarUrl: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setid = (id) => {
    this.id = id;
  };

  setAvatarUrl = (avatarUrl) => {
    this.avatarUrl = avatarUrl;
  };
}

export const partnerStore = new PartnerStore();
