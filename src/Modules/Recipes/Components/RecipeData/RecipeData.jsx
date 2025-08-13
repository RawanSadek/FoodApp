import React, { useEffect, useRef, useState } from 'react'
import RecipesHeader from '../../../Shared/Components/RecipesHeader/RecipesHeader'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Tags_URLs } from '../../../../Constants/END_POINTS.JSX';
import { getCategories } from '../../../ApiCalls/ApiCalls';
import { Recipes_URLs } from '../../../../Constants/END_POINTS.JSX';
import { toast } from 'react-toastify';
import loading from '../../../../assets/Images/loading.gif'


export default function RecipesData() {
  let location = useLocation();
  let view = location.state?.view;

  let params = useParams();
  let text
  if (params.id)
    text = 'Edit'
  else
    text = 'Fill'

  let fileInputRef = useRef();

  let handleClick = () => {
    fileInputRef.current.click();
  };


  const [imgPreview, setImgPreview] = useState(null);
  let handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        setImgPreview(URL.createObjectURL(file)); // create a temporary preview URL
      }
    }
  }

  let [isLoading, setIsLoading] = useState(true);

  let { register, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm();

  let [tags, setTags] = useState([]);
  let getTags = async () => {
    let response = await axios(Tags_URLs.all);
    setTags(response.data);
  }

  let [categories, setCategories] = useState([]);
  let getCategs = async () => {
    let response = await getCategories(9999, 1);
    setCategories(response.data.data);
  }

  useEffect(() => {
    getTags();
    getCategs();
  }, []);

  let navigate = useNavigate();

  let appendToFormData = (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('tagId', data.tagId);
    formData.append('categoriesIds', data.categoriesIds);
    formData.append('description', data.description);
    formData.append('recipeImage', fileInputRef.current.files[0]);
    return formData;
  }

  let onSubmit = async (data) => {
    console.log(fileInputRef.current.files[0])

    let recipeData = appendToFormData(data)

    if (params.id) {
      try {
        let response = await axios.put(`${Recipes_URLs.all}/${params.id}`, recipeData, { headers: { authorization: localStorage.getItem('token') } });
        toast.success(response.data.message);
        navigate('/dashboard/recipes');
      } catch (error) {
        toast.error(error);
      }
    }
    else {
      try {
        let response = await axios.post(Recipes_URLs.all, recipeData, { headers: { authorization: localStorage.getItem('token') } });
        toast.success(response.data.message);
        navigate('/dashboard/recipes');
      } catch (error) {
        toast.error(error);
      }
    }
  }

  let [recipeDetails, setRecipeDetails] = useState(null);
  let getRecipeDetails = async () => {
    try {
      let response = await axios.get(`${Recipes_URLs.all}/${params.id}`, { headers: { authorization: localStorage.getItem('token') } });
      // console.log(response.data.imagePath)
      setRecipeDetails(response.data)
    } catch (error) {
      toast.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (params.id)
      getRecipeDetails();
  }, [])

  let cancelRecipe = () => {
    reset();
    navigate('/dashboard/recipes');
  }

  return (
    <>
      <RecipesHeader title={text} btnText={'All'} />

      {isLoading && params.id ? <div className='text-center mt-5'><img src={loading} alt="loading" className='mt-5' /></div>
        :
        <Form onSubmit={handleSubmit(onSubmit)} className='w-75 m-auto p-5'>
          <Form.Group className="mb-3">
            <Form.Control defaultValue={recipeDetails?.name} disabled={view} {...register('name', { required: 'Recipe name is required!' })} type="text" placeholder="Recipe Name" className='bg-light' />
            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select defaultValue={params.id ? recipeDetails?.tag.id : ''} disabled={view}  {...register('tagId', { required: 'Tag is required!' })} placeholder='Tag' className='bg-light'>
              <option value="" disabled hidden>Tag</option>
              {tags.map(tag =>
                (<option key={tag.id} value={tag.id}>{tag.name}</option>)
              )}

            </Form.Select>
            {errors.tagId && <span className='text-danger'>{errors.tagId.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue={recipeDetails?.price} disabled={view} {...register('price', { required: 'price is required!' })} type="number" placeholder="Price" className='bg-light' />
            {errors.price && <span className='text-danger'>{errors.price.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select defaultValue={params.id ? recipeDetails?.category[0].id : ''} disabled={view} {...register('categoriesIds', { required: 'Category is required!' })} placeholder='Category' className='bg-light'>
              <option value="" disabled hidden>Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Select>
            {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue={recipeDetails?.description} disabled={view} {...register('description', { required: 'Description is required!' })} as="textarea" placeholder="Description" className='bg-light' />
            {errors.description && <span className='text-danger'>{errors.description.message}</span>}
          </Form.Group>

          <Form.Group className="img-input-container rounded pt-2 text-center" onClick={handleClick}>
            {imgPreview || recipeDetails?.imagePath ? <img src={imgPreview ? imgPreview : `https://upskilling-egypt.com:3006/${recipeDetails?.imagePath}`} className='w-25' /> : <i className="fa-solid fa-arrow-up-from-bracket fs-3 text-secondary"></i>}
            <p className='fw-medium'>Drag & Drop or <span className="theme-green-text">Choose an Image</span> to Upload</p>

            <Form.Control disabled={view} {...register('recipeImage')} ref={(e) => {
              fileInputRef.current = e; // store for manual click
              register("recipeImage").ref(e); // give to RHF
            }} onChange={handleFileChange} type="file" hidden className='img-input' />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button onClick={cancelRecipe} className='btn me-5 px-4 outlined-btn' type="button">Cancel</Button>
            <Button disabled={isSubmitting} className='btn auth-btn px-4 theme-green-bg text-white border-0' type="submit">Save <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img ms-3' /></Button>
          </div>
        </Form>
      }
    </>
  )
}
