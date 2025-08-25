import { axiosInstance } from "../../Services/END_POINTS.JS";
import { Categ_URLs } from "../../Services/END_POINTS.JS";

export async function getCategories(name, pageSize, pageNum) {
  let response
  try {
    response = await axiosInstance.get(Categ_URLs.all,
      {
        params: {
          name: name,
          pageSize: pageSize,
          pageNumber: pageNum
        }
      }
    )
  } catch (error) {
    console.log(error)
  }

  return response;
}
