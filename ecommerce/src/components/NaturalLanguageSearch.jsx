import React, { useState } from 'react';
import { parseNaturalLanguageQuery, getSuggestedQueries } from '../utils/nlpSearch';
import toast from 'react-hot-toast';

const NaturalLanguageSearch = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = getSuggestedQueries();

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    try {
      const parsedQuery = await parseNaturalLanguageQuery(searchQuery);
      onSearch(parsedQuery, searchQuery);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="natural-language-search mb-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="fas fa-brain me-2"></i>
            Natural Language Search
          </h5>
          <small>Try: "Show me running shoes under $100 with good reviews"</small>
        </div>
        <div className="card-body">
          <div className="position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Describe what you're looking for..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(query.length > 0)}
                disabled={isLoading}
              />
              <button
                className="btn btn-primary"
                onClick={() => handleSearch()}
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search me-2"></i>
                    Search
                  </>
                )}
              </button>
            </div>

            {showSuggestions && (
              <div className="position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
                <div className="card shadow-sm">
                  <div className="card-body p-2">
                    <div className="text-muted small mb-2">Try these examples:</div>
                    {suggestions
                      .filter(suggestion => 
                        query.length === 0 || 
                        suggestion.toLowerCase().includes(query.toLowerCase())
                      )
                      .slice(0, 6)
                      .map((suggestion, index) => (
                        <div
                          key={index}
                          className="suggestion-item p-2 rounded hover-bg-light cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{ cursor: 'pointer' }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <i className="fas fa-lightbulb text-warning me-2"></i>
                          <small>{suggestion}</small>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="row">
              <div className="col-md-6">
                <small className="text-muted">
                  <strong>What you can search for:</strong><br />
                  • Product types (headphones, shoes, watches)<br />
                  • Price ranges (under $100, expensive, cheap)<br />
                  • Quality (good reviews, 4+ stars, high rated)
                </small>
              </div>
              <div className="col-md-6">
                <small className="text-muted">
                  <strong>Example queries:</strong><br />
                  • "Wireless electronics under $150"<br />
                  • "Women's clothes with excellent reviews"<br />
                  • "Professional camera equipment over $300"
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalLanguageSearch;