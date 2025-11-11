import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "db", "users.json");

export const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
};

export const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

export const createUser = ({ id, name, email, password, token }) => {
  const users = readUsers();
  const newUser = {
    id,
    name,
    email,
    password,
    token,
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

export const findUserById = (id) => {
  const users = readUsers();
  return users.find((user) => user.id === id);
};

export const removeUserToken = (userId) => {
  const users = readUsers();
  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, token: null } : user
  );
  writeUsers(updatedUsers);
};
