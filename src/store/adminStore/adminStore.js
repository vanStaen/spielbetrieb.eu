import { action, makeObservable, observable } from 'mobx';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class AdminStore {
  selectedPage = cookies.get('selectedPage') || 'newsletter';

  constructor () {
    makeObservable(this, {
      selectedPage: observable,
      setSelectedPage: action
    });
  }

  setSelectedPage = (selectedPage) => {
    this.selectedPage = selectedPage;
    cookies.set('selectedPage', selectedPage, { path: '/' });
  };
}

export const adminStore = new AdminStore();
