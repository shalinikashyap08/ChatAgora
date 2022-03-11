const baseUrl = `http://192.170.2.29:3000/v1/`;
let headers = new Headers();
headers.append("content-type", "application/x-www-form-urlencoded");
headers.append('X-Restli-Protocol-Version', '2.0.0')
const get = async (url) => {
  return await axios({
    method: "get",
    url: `${baseUrl}${url}`,
    headers: headers,
  });
};

const post = async (url, data) => {
  return await axios({
    method: "post",
    url:`${baseUrl}${url}`,
    data: data
  });
};

const put = async (url, data) => {
 return  await axios({
    method: "put",
    url: `${baseUrl}${url}`,
    data: data,
  });
};


axios.interceptors.request.use(
  (request) => {
  
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjIwOGI1Y2YxZTFkYTNmNDRlNGYyMyIsImRhdGUiOiIyMDIyLTAzLTExVDA2OjIwOjI3LjczNloiLCJpYXQiOjE2NDY5Nzk2MjcsImV4cCI6MTY0NzA2NjAyN30.0JpHlZICVYBtBFla1-fKbMJUaHV5UWDJeMonarFN4X8';
    if(token){
      request.headers = {
        "authorization":token
      }
    }
    return request;
  },
  (err) => {
    console.log("Error=> ", err);
    return Promise.reject(error);
  }
);


