const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};
