import { action, makeObservable, observable } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export class SignUpStore {
  firstname = cookies.get("firstname") || null;
  lastname = cookies.get("lastname") || null;
  birthday = cookies.get("birthday") || null;
  username = cookies.get("username") || null;
  email = cookies.get("email") || null;

  constructor() {
    makeObservable(this, {
      firstname: observable,
      setFirstname: action,
      lastname: observable,
      setLastname: action,
      birthday: observable,
      setBirthday: action,
      username: observable,
      setUsername: action,
      email: observable,
      setEmail: action,
      resetAll: action,
    });
  }

  setFirstname = (firstname) => {
    this.firstname = firstname;
    cookies.set("firstname", firstname, { path: "/" });
  };

  setLastname = (lastname) => {
    this.lastname = lastname;
    cookies.set("lastname", lastname, { path: "/" });
  };

  setBirthday = (birthday) => {
    this.birthday = birthday;
    cookies.set("birthday", birthday, { path: "/" });
  };

  setUsername = (username) => {
    this.username = username;
    cookies.set("username", username, { path: "/" });
  };

  setEmail = (email) => {
    this.email = email;
    cookies.set("email", email, { path: "/" });
  };

  resetAll = () => {
    this.firstname = null;
    cookies.set("firstname", null, { path: "/" });
    this.lastname = null;
    cookies.set("lastname", null, { path: "/" });
    this.birthday = null;
    cookies.set("birthday", null, { path: "/" });
    this.username = null;
    cookies.set("username", null, { path: "/" });
    this.email = null;
    cookies.set("email", null, { path: "/" });
  };
}

export const signUpStore = new SignUpStore();
