import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', slug: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const headers = { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('slug', formData.slug);
    if (imageFile) {
      submitData.append('image', imageFile);
    } else {
      submitData.append('image', formData.image);
    }

    try {
      if (editingId) {
        await api.put(`/admin/categories/${editingId}`, submitData, { headers });
      } else {
        await api.post('/admin/categories', submitData, { headers });
      }
      setFormData({ name: '', slug: '', image: '' });
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-categories-page section">
      <div className="container">
        <div className="admin-header-flex">
          <div>
            <h1 className="premium-title">Menu Architecture</h1>
            <p className="premium-subtitle">Organize your snacks into elegant, heritage categories.</p>
          </div>
        </div>

        <div className="admin-form-container">
          <h2 className="admin-form-title">{editingId ? 'Edit Category' : 'Create New Category'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid-premium">
              <div className="admin-input-group">
                <label>Category name</label>
                <input className="admin-input-premium" placeholder="e.g., Traditional Mithai" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="admin-input-group">
                <label>URL Slug</label>
                <input className="admin-input-premium" placeholder="e.g., traditional-mithai" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
              </div>
              <div className="admin-input-group">
                <label>Category Icon/Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="admin-input-premium" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="upload-preview" />}
              </div>
            </div>
            <div style={{marginTop: '30px', display: 'flex', gap: '15px'}}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Committing...' : (editingId ? 'Update Identity' : 'Establish Category')}
              </button>
              {editingId && <button onClick={() => setEditingId(null)} className="btn-outline">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-list-premium">
          <h2 className="admin-form-title">Current Hierarchy</h2>
          <div className="admin-items-grid-premium">
            {categories.map(c => (
              <div key={c._id} className="admin-item-premium">
                <img src={c.image} alt={c.name} className="admin-item-img" />
                <div className="admin-item-info">
                  <h4>{c.name}</h4>
                  <p className="premium-subtitle">Slug: /{c.slug}</p>
                  <div className="admin-item-actions" style={{ marginTop: '15px' }}>
                    <button className="btn-outline btn-small" onClick={() => { setEditingId(c._id); setFormData(c); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Edit</button>
                    <button onClick={() => deleteCategory(c._id)} className="btn-outline btn-small btn-delete">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
