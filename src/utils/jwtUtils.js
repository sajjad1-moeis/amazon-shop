export const decodeJWT = (token) => {
  if (!token) {
    return { expired: true, expiresAt: null, timeUntilExpiry: null };
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { expired: true, expiresAt: null, timeUntilExpiry: null };
    }

    const payload = JSON.parse(atob(parts[1]));
    const expiresAt = payload.exp ? new Date(payload.exp * 1000) : null;
    const now = new Date();
    const timeUntilExpiry = expiresAt ? expiresAt.getTime() - now.getTime() : null;
    const expired = expiresAt ? now.getTime() >= expiresAt.getTime() : false;

    return {
      expired,
      expiresAt,
      timeUntilExpiry,
      payload,
    };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return { expired: true, expiresAt: null, timeUntilExpiry: null };
  }
};

export const isTokenExpiringSoon = (token) => {
  const { timeUntilExpiry } = decodeJWT(token);
  if (!timeUntilExpiry) return true;
  return timeUntilExpiry < 2 * 60 * 1000;
};

export const isTokenExpired = (token) => {
  return decodeJWT(token).expired;
};
