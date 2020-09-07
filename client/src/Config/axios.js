import Axios from 'axios'

const axios = Axios.create({
	baseURL: 'http://localhost:3055/api',
})

export default axios
