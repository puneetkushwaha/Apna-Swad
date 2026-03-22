import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Skeleton from '../components/Loader/Skeleton';

const AdminBrandStory = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    paragraphs: ['', ''],
    founders: [
      { name: 'Aditya Raj', title: 'Founder', linkedin: '#' },
      { name: 'Priyanka Singh', title: 'Co-Founder', linkedin: '#' }
    ],
    videoUrl: '',
    videoTag: '',
    caption: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [founderFiles, setFounderFiles] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.get('/brand-story');
        if (res.data) {
          setFormData({
            title: res.data.title,
            subtitle: res.data.subtitle,
            paragraphs: res.data.paragraphs,
            videoUrl: res.data.videoUrl || '',
            videoTag: res.data.videoTag || '',
            caption: res.data.caption || '',
            founders: res.data.founders || [
              { name: 'Aditya Raj', title: 'Founder', linkedin: '#' },
              { name: 'Priyanka Singh', title: 'Co-Founder', linkedin: '#' }
            ]
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStory();
  }, []);

  const handleParaChange = (index, value) => {
    const newParas = [...formData.paragraphs];
    newParas[index] = value;
    setFormData({ ...formData, paragraphs: newParas });
  };

  const addPara = () => {
    setFormData({ ...formData, paragraphs: [...formData.paragraphs, ''] });
  };

  const removePara = (index) => {
    const newParas = formData.paragraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, paragraphs: newParas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('subtitle', formData.subtitle);
    submitData.append('paragraphs', JSON.stringify(formData.paragraphs));
    submitData.append('founders', JSON.stringify(formData.founders));
    submitData.append('videoTag', formData.videoTag);
    submitData.append('caption', formData.caption);
    submitData.append('videoUrl', formData.videoUrl);

    if (imageFile) submitData.append('image', imageFile);
    if (videoFile) submitData.append('video', videoFile);
    if (founderFiles[0]) submitData.append('founder0Image', founderFiles[0]);
    if (founderFiles[1]) submitData.append('founder1Image', founderFiles[1]);

    try {
      const res = await api.post('/brand-story', submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setFormData({
          title: res.data.title,
          subtitle: res.data.subtitle,
          paragraphs: res.data.paragraphs,
          videoUrl: res.data.videoUrl,
          videoTag: res.data.videoTag,
          caption: res.data.caption,
          founders: res.data.founders
        });
      }
      alert('Brand Story updated successfully!');
    } catch (err) {
      alert('Error updating Brand Story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-reviews-page section">
      <div className="container">
        <h1 className="premium-title">Brand Narrative</h1>
        <p className="premium-subtitle">Edit your heritage story and brand essence.</p>

        <div className="admin-form-container shadow-hero" style={{ marginTop: '40px' }}>
          <form className="admin-form-premium" onSubmit={handleSubmit}>
            <div className="form-grid-premium">
              <div className="admin-input-group">
                <label>Main Title</label>
                <input className="admin-input-premium" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="admin-input-group">
                <label>Subtitle / Tagline</label>
                <input className="admin-input-premium" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} required />
              </div>
              <div className="admin-input-group">
                <label>Story Visual (Grandma Banner Image)</label>
                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="admin-input-premium" />
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <label className="admin-form-title" style={{ fontSize: '1.2rem', display: 'block', marginBottom: '15px' }}>Dhyanti's Story (Video Section)</label>
              <div className="form-grid-premium">
                <div className="admin-input-group">
                  <label>Video URL (or /video.mp4)</label>
                  <input className="admin-input-premium" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} />
                </div>
                <div className="admin-input-group">
                  <label>Video Tag (e.g. ZERO PRESERVATIVES)</label>
                  <input className="admin-input-premium" value={formData.videoTag} onChange={(e) => setFormData({ ...formData, videoTag: e.target.value })} />
                </div>
                <div className="admin-input-group">
                  <label>Upload New Video</label>
                  <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="admin-input-premium" />
                </div>
              </div>
              <div className="admin-input-group" style={{ marginTop: '20px' }}>
                <label>Caption (HTML supported)</label>
                <textarea 
                  className="admin-input-premium" 
                  style={{ minHeight: '80px' }} 
                  value={formData.caption} 
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })} 
                />
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <label className="admin-form-title" style={{ fontSize: '1.2rem', display: 'block', marginBottom: '15px' }}>Founders Configuration</label>
              <div className="form-grid-premium">
                {formData.founders.map((founder, idx) => (
                  <div key={idx} className="admin-input-group" style={{ background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '15px' }}>
                    <label>Founder {idx + 1}</label>
                    <input className="admin-input-premium" placeholder="Name" value={founder.name} onChange={(e) => {
                      const newFounders = [...formData.founders];
                      newFounders[idx].name = e.target.value;
                      setFormData({...formData, founders: newFounders});
                    }} />
                    <input className="admin-input-premium" style={{marginTop:'10px'}} placeholder="Title" value={founder.title} onChange={(e) => {
                      const newFounders = [...formData.founders];
                      newFounders[idx].title = e.target.value;
                      setFormData({...formData, founders: newFounders});
                    }} />
                    <input type="file" style={{marginTop:'10px'}} onChange={(e) => {
                      const newFiles = [...founderFiles];
                      newFiles[idx] = e.target.files[0];
                      setFounderFiles(newFiles);
                    }} className="admin-input-premium" />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <label className="admin-form-title" style={{ fontSize: '1.2rem', display: 'block', marginBottom: '15px' }}>Story Paragraphs</label>
              {formData.paragraphs.map((para, index) => (
                <div key={index} style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                  <textarea 
                    className="admin-input-premium" 
                    style={{ minHeight: '100px', flex: 1 }} 
                    value={para} 
                    onChange={(e) => handleParaChange(index, e.target.value)} 
                    required 
                  />
                  <button type="button" className="btn btn-outline" style={{ color: '#ff4444', borderColor: '#ff4444', height: '40px', padding: '0 15px' }} onClick={() => removePara(index)}>×</button>
                </div>
              ))}
              <button type="button" className="btn btn-outline" onClick={addPara} style={{ fontSize: '0.8rem', padding: '10px 20px' }}>+ Add Paragraph</button>
            </div>

            <div style={{ marginTop: '40px' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <Skeleton type="text" style={{ width: '100px', background: 'rgba(255,255,255,0.2)', margin: 0 }} /> : 'Save Narrative'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBrandStory;
