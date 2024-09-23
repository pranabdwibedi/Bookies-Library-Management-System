import { jwtDecode } from "jwt-decode";

export default function ValidateToken() {
    try {
      let token = localStorage.getItem('token')
        // Decode the token
        const decodedToken = jwtDecode(token);
    
        // Get the current time in seconds
        const currentTime = Date.now() / 1000;
        // Check if the token is expired
        if (((decodedToken.exp) < (currentTime))) {

          return false;
        }
        else{
          return true;
        }
        
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
}
