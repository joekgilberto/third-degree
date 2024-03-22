import './CategoryIndex.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import { Category } from '../../utilities/types';

import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Loading from '../../components/Loading/Loading';

export default function CategoryIndex() {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Array<Category>>([]);

  async function handleRequest(): Promise<void> {
    await categoryServices.getAllCategories().then((c: Array<Category>) => {
      setCategories(c);
    });
  };

  useEffect(() => {
    dispatch(setCurrentPage('categories'));
    handleRequest();
  }, []);

  if (!categories.length) {
    return <Loading />;
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
};