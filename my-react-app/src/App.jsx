import React, { useState, useRef } from 'react';

function useIncomeTracker() {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const catNameRef = useRef(null);

  const handleAddCategory = () => {
    if (!catName.trim() || !catDesc.trim()) {
      alert("Please complete both input fields.");
      return;
    }

    setCategories(prev => [
      ...prev, 
      { name: catName.trim(), desc: catDesc.trim() }
    ]);

    setCatName('');
    setCatDesc('');
    
    if (catNameRef.current) {
      catNameRef.current.focus();
    }
  };

  return {
    categories,
    catName,
    setCatName,
    catDesc,
    setCatDesc,
    catNameRef,
    handleAddCategory
  };
}

export default function App() {
  const {
    categories,
    catName,
    setCatName,
    catDesc,
    setCatDesc,
    catNameRef,
    handleAddCategory
  } = useIncomeTracker();

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
      />
      <div className="bg-light py-5 min-vh-100">
        <main className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              
              {/* Registration Card */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-primary text-white py-3">
                  <h1 className="h5 mb-0 fw-bold">Income Category Registration</h1>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
                    <div className="mb-3">
                      <label htmlFor="txtCatName" className="form-label fw-semibold">
                        Category Name
                      </label>
                      <input 
                        type="text" 
                        id="txtCatName" 
                        className="form-control"
                        placeholder="e.g., Consulting" 
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        ref={catNameRef}
                        required 
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="txtCatDesc" className="form-label fw-semibold">
                        Description
                      </label>
                      <input 
                        type="text" 
                        id="txtCatDesc" 
                        className="form-control"
                        placeholder="e.g., Enterprise technical support contract" 
                        value={catDesc}
                        onChange={(e) => setCatDesc(e.target.value)}
                        required 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary px-4 fw-semibold"
                    >
                      Save Category
                    </button>
                  </form>
                </div>
              </div>

              {/* Ledger Table Card */}
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3">
                  <h2 className="h6 mb-0 text-secondary fw-bold text-uppercase">
                    Registered Categories
                  </h2>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="w-35">Category Name</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="text-center text-muted py-3">
                            No categories added yet.
                          </td>
                        </tr>
                      ) : (
                        categories.map((category, index) => (
                          <tr key={index}>
                            <td className="fw-semibold text-dark">{category.name}</td>
                            <td className="text-secondary">{category.desc}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
