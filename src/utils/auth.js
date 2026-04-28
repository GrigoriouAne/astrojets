export const isUserLoggedIn = () => {
  return localStorage.getItem("astrojets_logged_in") === "true";
};

export const loginUser = (email) => {
  localStorage.setItem("astrojets_logged_in", "true");
  localStorage.setItem("astrojets_current_user_email", email);
};

export const logoutUser = () => {
  localStorage.removeItem("astrojets_logged_in");
  localStorage.removeItem("astrojets_current_user_email");
};

export const getAllUsers = () => {
  const users = localStorage.getItem("astrojets_users");
  return users ? JSON.parse(users) : [];
};

export const saveAllUsers = (users) => {
  localStorage.setItem("astrojets_users", JSON.stringify(users));
};

export const registerUser = (email, password) => {
  const users = getAllUsers();

  const exists = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser = { email, password };
  const updatedUsers = [...users, newUser];
  saveAllUsers(updatedUsers);

  return { success: true };
};

export const getRegisteredUser = () => {
  const currentEmail = localStorage.getItem("astrojets_current_user_email");
  if (!currentEmail) return null;

  const users = getAllUsers();
  return (
    users.find((user) => user.email.toLowerCase() === currentEmail.toLowerCase()) ||
    null
  );
};

export const findUserByEmail = (email) => {
  const users = getAllUsers();
  return (
    users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
  );
};