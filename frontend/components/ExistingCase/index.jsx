import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Frame1142 from "../Frame1142";
import Frame11532 from "../Frame11532";
import Frame11622 from "../Frame11622";
import Frame11322 from "../Frame11322";
import "./ExistingCase.css";

// Case card component optimized
const CaseCard = React.memo(({ caseItem, index }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="case-card" key={caseItem._id || index}>
      <h2>{caseItem.company_name || `Case study ${index + 1}`}</h2>
      <div className="case-details">
        <p><strong>Date:</strong> {formatDate(caseItem.timestamp || caseItem.date_created)}</p>
        <p><strong>Sector:</strong> {caseItem.activity_sector || "Not specified"}</p>
        <p><strong>Size:</strong> {caseItem.company_size || "Not specified"} employees</p>
      </div>
      <Link to={`/case-details/${caseItem._id}`} className="view-case-btn">View details</Link>
    </div>
  );
});

// Search bar component
const SearchBar = React.memo(({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a case study..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
});

// Filter bar component
const FilterBar = React.memo(({ sectors, onFilterChange }) => {
  const [activeSector, setActiveSector] = useState('all');

  const handleSectorChange = (sector) => {
    setActiveSector(sector);
    onFilterChange(sector);
  };

  return (
    <div className="filter-bar">
      <div className="filter-label">Filter by sector:</div>
      <div className="filter-options">
        <button
          className={`filter-btn ${activeSector === 'all' ? 'active' : ''}`}
          onClick={() => handleSectorChange('all')}
        >
          All
        </button>
        {sectors.map((sector, index) => (
          <button
            key={index}
            className={`filter-btn ${activeSector === sector ? 'active' : ''}`}
            onClick={() => handleSectorChange(sector)}
          >
            {sector}
          </button>
        ))}
      </div>
    </div>
  );
});

// Pagination component
const Pagination = React.memo(({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic to display a limited number of pages with ellipses
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="pagination">
      <button 
        className="pagination-btn prev" 
        onClick={handlePrevPage} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <div className="pagination-numbers">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <button 
        className="pagination-btn next" 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
});

// Main component
function ExistingCase(props) {
  const { x1200PxLogo_Icam__20081, existingCase, frame11622Props } = props;
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  
  // States for enhanced functionality
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const itemsPerPage = 6; // Number of cases per page
  const [dataFetched, setDataFetched] = useState(false); // To track if data has been loaded

  // Function to retrieve user case studies - optimized with useCallback
  const fetchUserCases = useCallback(async () => {
    try {
      setLoading(true);
      
      // Using AbortController to cancel the request if needed
      const controller = new AbortController();
      const signal = controller.signal;
      
      const token = localStorage.getItem("username"); // Use username as token
      
      // API call to retrieve case studies
      const response = await fetch(`${window.env.API_URL}/api/user-cases`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        signal
      });

      if (!response.ok) {
        throw new Error(`Error retrieving case studies (${response.status})`);
      }

      const data = await response.json();
      
      if (data.found) {
        // Sort cases by date by default (newest first)
        const sortedCases = data.cases.sort((a, b) => {
          const dateA = new Date(a.timestamp || a.date_created || 0);
          const dateB = new Date(b.timestamp || b.date_created || 0);
          return dateB - dateA; // Descending order
        });
        
        setCases(sortedCases);
        setFilteredCases(sortedCases);
        setDataFetched(true);
      } else {
        setCases([]);
        setFilteredCases([]);
        setDataFetched(true);
      }
      
      // Return a function to cancel the request
      return () => controller.abort();
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error:", err);
        setError("Unable to retrieve case studies. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load cases only if they haven't been loaded yet
    // or if returning to the page (navigation)
    if (!dataFetched || location.key) {
      const abortHandler = fetchUserCases();
      
      // Clean up only the AbortController when component unmounts
      return () => {
        if (abortHandler && typeof abortHandler === 'function') {
          abortHandler();
        }
      };
    }
  }, [location.key, fetchUserCases, dataFetched]);

  // Search function
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Filter function
  const handleFilterChange = useCallback((sector) => {
    setActiveFilter(sector);
    setCurrentPage(1); // Reset to first page when changing filter
  }, []);

  // Sort function
  const handleSortChange = useCallback((order) => {
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page when changing sort
  }, []);

  // Page change function
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of list
    window.scrollTo({
      top: document.querySelector('.main-content').offsetTop - 20,
      behavior: 'smooth'
    });
  }, []);

  // Calculate unique sectors for filters
  const uniqueSectors = useMemo(() => {
    if (!cases.length) return [];
    
    const sectors = cases
      .map(item => item.activity_sector)
      .filter(sector => sector && sector.trim().length > 0);
    
    return [...new Set(sectors)];
  }, [cases]);

  // Apply filters, search, and sorting to data
  useEffect(() => {
    let result = [...cases];
    
    // Apply filter
    if (activeFilter !== 'all') {
      result = result.filter(item => item.activity_sector === activeFilter);
    }
    
    // Apply search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        (item.company_name && item.company_name.toLowerCase().includes(term)) ||
        (item.activity_sector && item.activity_sector.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp || a.date_created || 0);
      const dateB = new Date(b.timestamp || b.date_created || 0);
      
      if (sortOrder === 'newest') {
        return dateB - dateA; // Newest first
      } else if (sortOrder === 'oldest') {
        return dateA - dateB; // Oldest first
      } else if (sortOrder === 'name') {
        const nameA = (a.company_name || '').toLowerCase();
        const nameB = (b.company_name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      }
      
      return 0;
    });
    
    setFilteredCases(result);
  }, [cases, activeFilter, searchTerm, sortOrder]);

  // Calculate items to display on current page
  const currentCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCases, currentPage, itemsPerPage]);

  // Optimized with useMemo
  const renderedContent = useMemo(() => {
    if (loading) {
      return <div className="loading-message">Loading case studies...</div>;
    }
    
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    if (cases.length === 0) {
      return (
        <div className="no-cases-message">
          <p>No case studies found. Start by creating a new case.</p>
          <Link to="/acquisition" className="create-case-btn">Create a new case</Link>
        </div>
      );
    }
    
    if (filteredCases.length === 0) {
      return (
        <div className="no-results-message">
          <p>No results match your search criteria.</p>
          <button onClick={() => {
            setSearchTerm('');
            setActiveFilter('all');
          }} className="reset-filters-btn">
            Reset filters
          </button>
        </div>
      );
    }
    
    return (
      <>
        <div className="cases-summary">
          <p className="results-count">
            {filteredCases.length} case {filteredCases.length === 1 ? 'study' : 'studies'} 
            {activeFilter !== 'all' ? ` in sector "${activeFilter}"` : ''} 
            {searchTerm ? ` for search "${searchTerm}"` : ''}
          </p>
          
          <div className="sort-options">
            <span className="sort-label">Sort by:</span>
            <button 
              className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`} 
              onClick={() => handleSortChange('newest')}
            >
              Newest
            </button>
            <button 
              className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`} 
              onClick={() => handleSortChange('oldest')}
            >
              Oldest
            </button>
            <button 
              className={`sort-btn ${sortOrder === 'name' ? 'active' : ''}`} 
              onClick={() => handleSortChange('name')}
            >
              Alphabetical
            </button>
          </div>
        </div>
        
        <div className="cases-grid">
          {currentCases.map((caseItem, index) => (
            <CaseCard 
              key={caseItem._id || index}
              caseItem={caseItem}
              index={index}
            />
          ))}
        </div>
        
        <Pagination 
          totalItems={filteredCases.length} 
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  }, [cases, filteredCases, loading, error, currentCases, currentPage, activeFilter, searchTerm, sortOrder, handlePageChange, handleSortChange]);

  return (
    <div className="container-center-horizontal">
      <div className="existing-case-63 screen">
        <div className="overlap-group-7">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-5"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
              loading="lazy"
            />
          </Link>
          <div className="nav-items-3-62">
            <Frame1142 />
            <Frame11532 />
            <div className="frame-117-72">
              <div className="existing-case-64 valign-text-middle inter-medium-sonic-silver-18px">{existingCase}</div>
            </div>
            <Frame11622>{frame11622Props.children}</Frame11622>
            <Frame11322 />
          </div>
        </div>
        
        {/* Main content */}
        <div className="main-content">
          <div className="page-header">
            <h1 className="page-title">Existing Case Studies</h1>
            <div className="new-case-container">
              <Link to="/acquisition" className="create-new-btn">
                New Case
              </Link>
            </div>
          </div>
          
          <div className="controls-container">
            <SearchBar onSearch={handleSearch} />
            
            <div className="refresh-container">
              <button onClick={fetchUserCases} className="refresh-btn">
                Refresh
              </button>
            </div>
          </div>
          
          {!loading && !error && cases.length > 0 && (
            <FilterBar 
              sectors={uniqueSectors} 
              onFilterChange={handleFilterChange}
            />
          )}
          
          {/* Main content with pagination */}
          {renderedContent}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ExistingCase);
