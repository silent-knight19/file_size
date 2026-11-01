import React, { useState } from 'react';
import { formatFileSize } from './utils/formatFileSize';
import './App.css';

const SAMPLE_FILES = [
  {
    id: 1,
    name: 'Meeting Notes.docx',
    type: 'Word Document',
    lastModified: 'Oct 24, 2026, 10:30 AM',
    sizeBytes: 512,
    icon: 'docx',
  },
  {
    id: 2,
    name: 'Project Report.pdf',
    type: 'PDF Document',
    lastModified: 'Oct 28, 2026, 02:15 PM',
    sizeBytes: 1024,
    icon: 'pdf',
  },
  {
    id: 3,
    name: 'Design Assets.zip',
    type: 'ZIP Archive',
    lastModified: 'Oct 30, 2026, 04:45 PM',
    sizeBytes: 1048576,
    icon: 'zip',
  },
  {
    id: 4,
    name: 'Backup Archive.tar',
    type: 'TAR Archive',
    lastModified: 'Nov 01, 2026, 09:00 AM',
    sizeBytes: 1572864,
    icon: 'tar',
  },
];

function FileIcon({ type }) {
  if (type === 'pdf') {
    return (
      <span className="file-badge badge-pdf" aria-label="PDF file">
        PDF
      </span>
    );
  }
  if (type === 'docx') {
    return (
      <span className="file-badge badge-docx" aria-label="Word document">
        DOC
      </span>
    );
  }
  if (type === 'zip' || type === 'tar') {
    return (
      <span className="file-badge badge-archive" aria-label="Archive file">
        ZIP
      </span>
    );
  }
  return <span className="file-badge badge-default">FILE</span>;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFiles = SAMPLE_FILES.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === 'documents') {
      return matchesSearch && (file.type.includes('Document') || file.type.includes('PDF'));
    }
    if (activeCategory === 'archives') {
      return matchesSearch && file.type.includes('Archive');
    }
    return matchesSearch;
  });

  return (
    <div className="file-manager-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">📁</div>
          <span className="logo-text">FileManager</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-title">Storage</div>
          <button
            className={`nav-item ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span className="nav-icon">📂</span>
            <span className="nav-label">All Files</span>
            <span className="nav-counter">{SAMPLE_FILES.length}</span>
          </button>
          <button
            className={`nav-item ${activeCategory === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveCategory('documents')}
          >
            <span className="nav-icon">📄</span>
            <span className="nav-label">Documents</span>
          </button>
          <button
            className={`nav-item ${activeCategory === 'archives' ? 'active' : ''}`}
            onClick={() => setActiveCategory('archives')}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-label">Archives</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="storage-card">
            <div className="storage-title">Storage Usage</div>
            <div className="storage-bar-track">
              <div className="storage-bar-fill" style={{ width: '25%' }}></div>
            </div>
            <div className="storage-meta">4 files in sample directory</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="content-header">
          <div className="breadcrumbs">
            <span className="breadcrumb-root">Home</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">All Files</span>
          </div>

          <div className="header-actions">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search files"
              />
            </div>
          </div>
        </header>

        <div className="table-wrapper">
          <div className="table-toolbar">
            <h1 className="section-title">Files</h1>
            <span className="file-count">{filteredFiles.length} item{filteredFiles.length !== 1 ? 's' : ''}</span>
          </div>

          <table className="files-table">
            <thead>
              <tr>
                <th className="col-name">File name</th>
                <th className="col-type">File type</th>
                <th className="col-modified">Last modified</th>
                <th className="col-size">File size</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <tr key={file.id} className="file-row">
                    <td className="cell-name">
                      <div className="file-name-wrapper">
                        <FileIcon type={file.icon} />
                        <span className="file-name-text">{file.name}</span>
                      </div>
                    </td>
                    <td className="cell-type">{file.type}</td>
                    <td className="cell-modified">{file.lastModified}</td>
                    <td className="cell-size">
                      <span className="file-size-badge">{formatFileSize(file.sizeBytes)}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    No files found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

