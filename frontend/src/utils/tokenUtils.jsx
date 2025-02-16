export const isTokenValid = (token) => {
    try {
      // Split the token into parts
      const [, payload] = token.split(".");
      
      // Decode the base64 payload
      const decodedPayload = JSON.parse(atob(payload));
      
      // Check expiration
      return decodedPayload.exp > Date.now() / 1000;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };
  