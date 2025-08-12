import axios from "axios";
import { Categ_URLs } from "../../Constants/END_POINTS.JSX";

export async function getCategories() {
    let response
    try {
      response = await axios.get(`${Categ_URLs.all}/?pageSize=5&pageNumber=1`, { headers: { authorization: localStorage.getItem('token') } });
    } catch (error) {
      console.log(error)
    }

    return response;
  }
