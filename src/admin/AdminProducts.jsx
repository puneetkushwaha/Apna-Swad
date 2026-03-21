import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '', description1: '', description2: '', description3: '', price: '', weight: '', category: '', image: '', tags: '', salesCount: 0, isBestSeller: false,
    shelfLife: '', storageInstructions: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [hoverImagePreview, setHoverImagePreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Use standard token
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e, target) => {
    const file = e.target.files[0];
    if (file) {
      if (target === 'main') {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else if (target === 'hover') {
        setHoverImageFile(file);
        setHoverImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeGalleryImage = (idx, isExisting = false) => {
    if (isExisting) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== idx)
      }));
      setGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
    } else {
      setGalleryFiles(prev => prev.filter((_, i) => i !== idx));
      // For new gallery files, previews are at the end of galleryPreviews
      // But it's easier to just rebuild previews or manage them separately.
      // Let's keep it simple for now: if we remove a new one, we need to find its preview.
      // Actually, galleryPreviews contains BOTH.
      setGalleryPreviews(prev => prev.filter((_, i) => i !== (formData.images?.length || 0) + idx));
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
    
    // Merge paragraphs with double newlines
    const fullDescription = [formData.description1, formData.description2, formData.description3]
      .filter(p => p && p.trim())
      .join('\n\n');

    // EXPLICITLY append each field. Do NOT loop over formData to avoid duplicates and system fields.
    submitData.append('name', formData.name);
    submitData.append('description', fullDescription);
    submitData.append('price', formData.price);
    submitData.append('weight', formData.weight);
    submitData.append('category', formData.category);
    submitData.append('tags', formData.tags);
    submitData.append('salesCount', formData.salesCount);
    submitData.append('isBestSeller', formData.isBestSeller);
    submitData.append('shelfLife', formData.shelfLife);
    submitData.append('storageInstructions', formData.storageInstructions);

    // Handle Image Files
    if (imageFile) {
      submitData.append('image', imageFile);
    } else if (editingId && formData.image) {
      submitData.append('image', formData.image);
    }

    if (hoverImageFile) {
      submitData.append('hoverImage', hoverImageFile);
    } else if (editingId && formData.hoverImage) {
      submitData.append('hoverImage', formData.hoverImage);
    }

    // Handle Gallery
    if (editingId) {
      submitData.append('existingImages', JSON.stringify(formData.images || []));
    }
    galleryFiles.forEach(file => {
      submitData.append('gallery', file);
    });

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, submitData, { headers });
      } else {
        await api.post('/admin/products', submitData, { headers });
      }
      setFormData({ 
        name: '', description1: '', description2: '', description3: '', 
        price: '', weight: '', category: '', image: '', tags: '', 
        salesCount: 0, isBestSeller: false, shelfLife: '', storageInstructions: '' 
      });
      setImageFile(null);
      setImagePreview('');
      setHoverImageFile(null);
      setHoverImagePreview('');
      setGalleryFiles([]);
      setGalleryPreviews([]);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-products-page section">
      <div className="container">
        <div className="admin-header-flex">
          <div>
            <h1 className="premium-title">Product Catalog</h1>
            <p className="premium-subtitle">Curate your premium selection of handcrafted snacks.</p>
          </div>
        </div>

        <div className="admin-form-container">
          <h2 className="admin-form-title">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid-premium">
              <div className="admin-input-group">
                <label>Product Name</label>
                <input className="admin-input-premium" placeholder="e.g., Artisanal Besan Ladoo" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="admin-input-group">
                <label>Price (₹)</label>
                <input className="admin-input-premium" placeholder="0.00" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div className="admin-input-group">
                <label>Weight</label>
                <input className="admin-input-premium" placeholder="e.g., 250g" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} required />
              </div>
              <div className="admin-input-group">
                <label>Category</label>
                <select className="admin-input-premium" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div className="admin-input-group">
                <label>Main Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'main')} className="admin-input-premium" />
                {(imagePreview || formData.image) && <img src={imagePreview || formData.image} alt="Preview" className="upload-preview" />}
              </div>
              <div className="admin-input-group">
                <label>Hover Image (Zoom Effect)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'hover')} className="admin-input-premium" />
                {(hoverImagePreview || formData.hoverImage) && <img src={hoverImagePreview || formData.hoverImage} alt="Hover Preview" className="upload-preview" />}
              </div>
              <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                <label>Product Gallery (Multiple Images)</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="admin-input-premium" />
                <div className="gallery-previews-admin">
                  {galleryPreviews.map((src, i) => {
                    const isExisting = i < (formData.images?.length || 0);
                    return (
                      <div key={i} className="gallery-preview-item">
                        <img src={src} alt={`Gallery ${i}`} />
                        <button type="button" onClick={() => removeGalleryImage(isExisting ? i : i - (formData.images?.length || 0), isExisting)} className="remove-preview">×</button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="admin-input-group">
                <label>Tags</label>
                <input className="admin-input-premium" placeholder="Split with commas" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Shelf Life</label>
                <input className="admin-input-premium" placeholder="e.g., 40 days" value={formData.shelfLife} onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Storage Instructions</label>
                <input className="admin-input-premium" placeholder="e.g., Cool, dry place" value={formData.storageInstructions} onChange={(e) => setFormData({ ...formData, storageInstructions: e.target.value })} />
              </div>
              <div className="admin-input-group" style={{ justifyContent: 'center' }}>
                <label className="checkbox-label-premium">
                  <input type="checkbox" checked={formData.isBestSeller} onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })} />
                  <span>Mark as Best Seller</span>
                </label>
              </div>
            </div>
            
            <div className="multi-description-section" style={{ marginTop: '25px' }}>
              <div className="admin-input-group">
                <label>Paragraph 1 (Main Story)</label>
                <textarea className="admin-input-premium" style={{ minHeight: '100px' }} placeholder="The opening story..." value={formData.description1} onChange={(e) => setFormData({ ...formData, description1: e.target.value })} required />
              </div>
              <div className="admin-input-group" style={{ marginTop: '15px' }}>
                <label>Paragraph 2 (Craftsmanship)</label>
                <textarea className="admin-input-premium" style={{ minHeight: '100px' }} placeholder="Details about how it's made..." value={formData.description2} onChange={(e) => setFormData({ ...formData, description2: e.target.value })} />
              </div>
              <div className="admin-input-group" style={{ marginTop: '15px' }}>
                <label>Paragraph 3 (Heritage/Closing)</label>
                <textarea className="admin-input-premium" style={{ minHeight: '100px' }} placeholder="Anything else to highlight..." value={formData.description3} onChange={(e) => setFormData({ ...formData, description3: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Processing...' : (editingId ? 'Save Changes' : 'Create Product')}
              </button>
              {editingId && <button onClick={() => setEditingId(null)} className="btn-outline">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-list-premium">
          <h2 className="admin-form-title">Current Selection</h2>
          <div className="admin-items-grid-premium">
            {products.map(p => (
              <div key={p._id} className="admin-item-premium">
                <div className="admin-item-images">
                  <img src={p.image} alt={p.name} className="admin-item-img" />
                </div>
                <div className="admin-item-info">
                  <span className="item-category-tag">{p.category?.name}</span>
                  <h4>{p.name}</h4>
                  <div className="item-meta-stats">
                    <span>₹{p.price}</span>
                    <span className="dot">•</span>
                    <span>{p.weight}</span>
                    <span className="dot">•</span>
                    <span>Sales: {p.salesCount || 0}</span>
                  </div>
                  <div className="admin-item-actions">
                    <button className="btn-outline btn-small" onClick={() => { 
                      const paragraphs = (p.description || '').split('\n\n');
                      setEditingId(p._id); 
                      
                      // Explicitly pick fields to avoid polluting formData with system fields
                      setFormData({ 
                        name: p.name || '',
                        price: p.price || '',
                        weight: p.weight || '',
                        category: p.category?._id || '',
                        image: p.image || '',
                        hoverImage: p.hoverImage || '',
                        tags: p.tags?.join(', ') || '',
                        salesCount: p.salesCount || 0,
                        isBestSeller: p.isBestSeller || false,
                        shelfLife: p.shelfLife || '',
                        storageInstructions: p.storageInstructions || '',
                        description1: paragraphs[0] || '',
                        description2: paragraphs[1] || '',
                        description3: paragraphs[2] || '',
                        images: p.images || [] // Keep reference for preview if needed
                      }); 
                      
                      setGalleryPreviews(p.images || []);
                      setGalleryFiles([]); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }}>Edit</button>
                    <button onClick={() => deleteProduct(p._id)} className="btn-outline btn-small btn-delete">Delete</button>
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

export default AdminProducts;
