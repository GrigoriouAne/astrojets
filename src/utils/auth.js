import { supabase } from "./supabase";

const ADMIN_EMAIL = "astrojets.ws@gmail.com";

export const isAdminEmail = (email) => {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
};

export const isUserLoggedIn = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return !!session;
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, user: data.user };
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
};

export const registerUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch" };
  }
};

export const getRegisteredUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email,
    role: isAdminEmail(user.email) ? "admin" : "customer",
  };
};

export const getCurrentSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};

export const findUserByEmail = async (email) => {
  const user = await getRegisteredUser();

  if (!user) return null;

  return user.email?.toLowerCase() === email.toLowerCase() ? user : null;
};

export const getAllUsers = async () => {
  const user = await getRegisteredUser();
  return user ? [user] : [];
};

export const saveAllUsers = async () => {
  return;
};