import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export class AdminStore {
    hasAdminAccess = cookies.get('hasAdminAccess');
    selectedPage = cookies.get('selectedPage') || 'newsletter';

    constructor() {
        makeObservable(this, {
            hasAdminAccess: observable,
            setHasAdminAccess: action,
            pinLogin: action,
            selectedPage: observable,
            setSelectedPage: action,
        });
    }

    setHasAdminAccess = (hasAdminAccess) => {
        this.hasAdminAccess = hasAdminAccess;
        cookies.set('hasAdminAccess', hasAdminAccess, { path: '/' });
    };

    pinLogin = (pin) => {
        if (pin === '555666') {
            this.setHasAdminAccess(true);
        }
    }

    setSelectedPage = (selectedPage) => {
        this.selectedPage = selectedPage;
        cookies.set('selectedPage', selectedPage, { path: '/' });
    };
}

export const adminStore = new AdminStore();
