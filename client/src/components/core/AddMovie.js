import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AddMovies } from './coreapicalls';
const AddMovie = () => {
  const [formData, setFormData] = useState({
    name: '',
    imageurl: '',
    summary: '',
  });
  const { name, imageurl, summary } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    AddMovies({ name, imageurl, summary });
    setFormData({ ...formData, name: '', imageurl: '', summary: '' });
    alert('Movie successfully Added...');
  };
  return (
    <section className='container'>
      <Link to='/' className='btn btn-light'>
        Back To Movies List
      </Link>
      <h1 className='large text-primary'>Add Movie</h1>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Movie Name'
            name='name'
            required
            onChange={(e) => onChange(e)}
            value={name}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Image URL'
            name='imageurl'
            required
            onChange={(e) => onChange(e)}
            value={imageurl}
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Movie Summary'
            name='summary'
            required
            onChange={(e) => onChange(e)}
            value={summary}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Add' />
      </form>
    </section>
  );
};
export default AddMovie;
