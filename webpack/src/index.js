import { getUsers } from "./common/usersAPI";
import "./style.less";
console.log("Hello webpack!");

getUsers().then(json => console.log(json));

const fancyFunc = () => {
  return [1, 2];
};

const [a, b] = fancyFunc();