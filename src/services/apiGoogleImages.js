import axios from "axios";

const apiGoogleImages = axios.create({
    baseURL: "https://www.googleapis.com/customsearch/v1?key=AIzaSyAJlKNELQ8ZzA7ty858UhXr_yd2n9AbTNg&cx=256ca1f40ac2d4930&q=",
})

export default apiGoogleImages;