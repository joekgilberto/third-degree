import './CategoryIndex.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as categoryServices from '../../utilities/category/category-services';
import { Category } from '../../utilities/types';

import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../components/Header/navSlice';

export default function CategoryIndex() {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Array<Category>>([]);

  async function handleRequest(): Promise<void> {
    await categoryServices.getAllCategories().then((c: Array<Category>) => {
      setCategories(c);
    })
  }

  useEffect(() => {
    dispatch(setCurrentPage('categories'));
    handleRequest();
  }, [])

  if (!categories.length) {
    return <p>Loading...</p>
  }

  return (
    <div className='CategoryIndex'>
      <h2>Smart your engines!</h2>
      <p>And pick your <span className='special bold'>category</span>:</p>
      <hr />
      {categories.map((category) => {
        return (
          <CategoryCard key={category.id} category={category} />
        )
      })}
    </div>
  );
}