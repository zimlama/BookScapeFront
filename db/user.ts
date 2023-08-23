type User = {
  id: number;
  nombre: string;
  email: string;
  password: string;
};

let users: User[] = [
  {
    id: 1,
    nombre: "Martin Morales Jimenez",
    email: "marmorji123465@gmail.com",
    password: "123456",
  },
  {
    id: 2,
    nombre: "Martin Jose",
    email: "marmorji123@gmail.com",
    password: "more0106",
  },
];

export function getUsers() {
  return users;
}

export function addUser(user: User) {
  users.push(user);
}
