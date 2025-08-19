import axios from "axios";
import { Categ_URLs } from "../../Constants/END_POINTS.JSX";

export async function getCategories(name,pageSize, pageNum) {
    let response
    try {
      response = await axios.get(`${Categ_URLs.all}/?name=${name}&pageSize=${pageSize}&pageNumber=${pageNum}`, { headers: { authorization: localStorage.getItem('token') } });
    } catch (error) {
      console.log(error)
    }

    return response;
  }
