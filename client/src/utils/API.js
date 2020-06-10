import axios from 'axios';
// set up axios to send cookies with request
const axiosInstance = axios.create({
	withCredentials: true
});



export default axiosInstance;
