import React, { useEffect, useRef, useState } from 'react'
import RecipesHeader from '../../../Shared/Components/RecipesHeader/RecipesHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Tags_URLs } from '../../../../Constants/END_POINTS.JSX';
import { getCategories } from '../../../ApiCalls/ApiCalls';
import { Recipes_URLs } from '../../../../Constants/END_POINTS.JSX';
import { toast } from 'react-toastify';

export default function RecipesData() {

  let location = useLocation();
  let text = location.state?.text;


  let fileInputRef = useRef();

  let [uploaded, setUploaded] = useState(false);
  let handleClick = () => {
    fileInputRef.current.click();
    uploaded = true;
  };

  let handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setUploaded(true);
    } else {
      setUploaded(false);
    }
  }

  let { register, formState: { errors }, handleSubmit, reset } = useForm();

  let [tags, setTags] = useState([]);
  let getTags = async () => {
    let response = await axios(Tags_URLs.all);
    setTags(response.data);
  }

  let [categories, setCategories] = useState([]);
  let getCategs = async () => {
    let response = await getCategories();
    setCategories(response.data.data);
  }

  useEffect(() => {
    getTags();
    getCategs();
  }, []);

  let navigate = useNavigate();

  let onSubmit = async (data) => {
    try {
      let response = await axios.post(Recipes_URLs.all, data, { headers: { authorization: localStorage.getItem('token') } });
      toast.success(response.data.message);
      navigate('/dashboard/recipes');
    } catch (error) {
      toast.error(error);
    }

  }

  let cancelRecipe = () => {
    reset();
    navigate('/dashboard/recipes');
  }

  return (
    <>
      <RecipesHeader title={text} btnText={'All'} />

      <Form onSubmit={handleSubmit(onSubmit)} className='w-75 m-auto p-5'>
        <Form.Group className="mb-3">
          <Form.Control {...register('name', { required: 'Recipe name is required!' })} type="text" placeholder="Recipe Name" className='bg-light' />
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select  {...register('tagId', { required: 'Tag is required!' })} placeholder='Tag' className='bg-light' defaultValue="">
            <option value="" disabled hidden>Tag</option>
            {tags.map(tag =>
              (<option key={tag.id} value={tag.id}>{tag.name}</option>)
            )}

          </Form.Select>
          {errors.tagId && <span className='text-danger'>{errors.tagId.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control {...register('price', { required: 'price is required!' })} type="number" placeholder="Price" className='bg-light' />
          {errors.price && <span className='text-danger'>{errors.price.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select {...register('categoriesIds', { required: 'Category is required!' })} placeholder='Category' className='bg-light' defaultValue=''>
            <option value="" disabled hidden>Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>
          {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control {...register('description', { required: 'Description is required!' })} as="textarea" placeholder="Description" className='bg-light' />
          {errors.description && <span className='text-danger'>{errors.description.message}</span>}
        </Form.Group>

        <Form.Group className="img-input-container rounded pt-2 text-center" onClick={handleClick}>
          {uploaded ? <i class="fa-regular fa-circle-check fs-2 text-success"></i> : <i className="fa-solid fa-arrow-up-from-bracket fs-3 text-secondary"></i>}
          <p className='fw-medium'>Drag & Drop or <span className="theme-green-text">Choose an Image</span> to Upload</p>

          <Form.Control onChange={handleFileChange} type="file" ref={fileInputRef} hidden className='img-input' />
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Button onClick={cancelRecipe} className='btn me-5 px-4 outlined-btn' type="button">Cancel</Button>
          <Button className='btn auth-btn px-4 theme-green-bg text-white border-0' type="submit">Save</Button>
        </div>
      </Form>
    </>
  )
}
