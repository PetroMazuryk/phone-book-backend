import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const usersFile = path.join(process.cwd(), "db", "users.json");

const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

export const createUser = ({ name, email, password }) => {
  const users = readUsers();
  const newUser = {
    id: nanoid(),
    name,
    email,
    password,
    createdAt: new Date(),
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
};

export const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find((user) => user.email === email);
};
