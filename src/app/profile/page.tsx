"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { StudentProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>({
    name: "",
    age: "",
    grade: "",
    school: "",
    city: "",
    rollNumber: "",
    isSubscriber: false,
    joinedDate: "",
    avatar: ""
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const saved = localStorage.getItem("wwj_profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      if (parsed.avatar) {
        setAvatarPreview(parsed.avatar);
      }
    }
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setAvatarPreview(dataUrl);
      setProfile(prev => ({ ...prev, avatar: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("wwj_profile", JSON.stringify(profile));
    alert("Profile picture and details saved successfully!");
    // Give layout time to react or manually reload
    window.location.reload();
  };

  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile.name || "Student")}`;

  return (
    <div className="profile-container">
      <header className="page-header">
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900 }}>My Profile</h1>
        <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Update your photo and student details.</p>
      </header>
      
      <div className="profile-layout">
        <div className="profile-sidebar premium-glass">
          <div className="avatar-section">
            <div className="avatar-preview-wrap">
              <img src={avatarPreview || defaultAvatar} alt="Profile Picture" className="avatar-image" />
              {profile.isSubscriber && <span className="blue-tick-large">✓</span>}
            </div>
            
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => fileInputRef.current?.click()}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: '1rem' }}
            >
              📷 Upload Photo
            </button>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg, image/webp" 
              ref={fileInputRef} 
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <p className="upload-hint">Formats: JPG, PNG, WEBP. Max size: 2MB.</p>

            {avatarPreview && (
              <button 
                type="button"
                className="btn-text" 
                style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}
                onClick={() => {
                  setAvatarPreview("");
                  setProfile(prev => ({ ...prev, avatar: undefined }));
                }}
              >
                Remove Custom Photo
              </button>
            )}
          </div>
          
          <div className="profile-stats">
            <div className="stat-row">
              <span className="stat-label">Roll No.</span>
              <span className="stat-val roll-font">{profile.rollNumber || "Not Assigned"}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Joined</span>
              <span className="stat-val">{profile.joinedDate || "N/A"}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Status</span>
              <span className="stat-val" style={{ color: profile.isSubscriber ? 'var(--neon-green)' : 'var(--muted)' }}>
                {profile.isSubscriber ? "Premium Member" : "Free Tier"}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-form-area premium-glass">
          <form className="edit-form" onSubmit={handleSave}>
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input 
                  type="number" 
                  value={profile.age} 
                  onChange={e => setProfile({...profile, age: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Class/Grade</label>
                <select 
                  value={profile.grade} 
                  onChange={e => setProfile({...profile, grade: e.target.value})}
                  required
                >
                  <option value="" disabled>Select Class</option>
                  {[5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                    <option key={g} value={g.toString()}>Class {g}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  value={profile.city} 
                  onChange={e => setProfile({...profile, city: e.target.value})}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>School Name</label>
                <input 
                  type="text" 
                  value={profile.school} 
                  onChange={e => setProfile({...profile, school: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-neon">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .page-header {
          margin-bottom: 2rem;
        }
        .profile-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }
        .premium-glass {
          background: rgba(14,22,56,0.6);
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 1.5rem;
          padding: 2rem;
          backdrop-filter: blur(20px);
        }
        .avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .avatar-preview-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: var(--background);
          padding: 4px;
          background: conic-gradient(var(--primary), var(--neon-green), var(--primary));
          margin-bottom: 0.5rem;
        }
        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--background);
        }
        .blue-tick-large {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 28px;
          height: 28px;
          background: #1DA1F2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 900;
          font-size: 1rem;
          border: 3px solid var(--background);
        }
        .upload-hint {
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 0.5rem;
        }
        .btn-text {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          padding: 0;
        }
        .btn-text:hover { text-decoration: underline; }
        
        .profile-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding: 0.5rem;
          background: rgba(0,0,0,0.2);
          border-radius: 0.5rem;
        }
        .stat-label { color: var(--muted); font-weight: 600; }
        .stat-val { font-weight: 700; color: white; }
        .roll-font { font-family: 'Space Mono', monospace; letter-spacing: 0.05em; color: var(--primary-glow); }
        
        .edit-form h3 {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 0.5rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .full-width { grid-column: 1 / -1; }
        .form-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-group input, .form-group select {
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border);
          color: white;
          padding: 0.85rem;
          border-radius: 0.75rem;
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: var(--primary);
        }
        .form-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        
        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
