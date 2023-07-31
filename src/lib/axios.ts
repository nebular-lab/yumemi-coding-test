import  Axios  from "axios";

export const axios=Axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
  headers: {
    'X-API-KEY': process.env.REACT_APP_API_KEY,
  },
});