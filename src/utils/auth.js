export const isUserLoggedIn = () => {
  return localStorage.getItem("astrojets_logged_in") === "true";
};

export const loginUser = () => {
  localStorage.setItem("astrojets_logged_in", "true");
};

export const logoutUser = () => {
  localStorage.removeItem("astrojets_logged_in");
};

export const registerUser = (email, password) => {
  const user = { email, password };
  localStorage.setItem("astrojets_user", JSON.stringify(user));
};

export const getRegisteredUser = () => {
  const user = localStorage.getItem("astrojets_user");
  return user ? JSON.parse(user) : null;
};