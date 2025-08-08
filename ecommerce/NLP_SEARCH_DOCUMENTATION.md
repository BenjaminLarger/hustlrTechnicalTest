# Natural Language Search Implementation

## Overview

This document describes the implementation of natural language search functionality for the e-commerce product catalog. Users can now search using conversational queries like "Show me running shoes under $100 with good reviews".

## Architecture

The natural language search system consists of three main components:

### 1. NLP Search Utility (`src/utils/nlpSearch.js`)
- **OpenAI Integration**: Uses GPT-3.5-turbo to parse natural language queries
- **Query Parsing**: Converts user input into structured search criteria
- **Filtering Logic**: Applies parsed criteria to product catalog
- **Fallback System**: Graceful degradation when API is unavailable

### 2. Natural Language Search Component (`src/components/NaturalLanguageSearch.jsx`)
- **User Interface**: Clean, intuitive search interface
- **Query Suggestions**: Pre-built example queries to guide users
- **Real-time Feedback**: Loading states and error handling
- **Auto-complete**: Dropdown with suggested queries

### 3. Product Catalog Integration (`src/components/ProductCatalog.jsx`)
- **Seamless Integration**: NLP search works alongside existing filters
- **State Management**: Proper handling of search modes
- **Results Display**: Clear indication when NLP search is active

## Features

### Query Understanding
The system can parse and understand:

- **Product Types**: headphones, shoes, watches, clothing
- **Price Ranges**: "under $100", "cheap", "expensive", specific amounts
- **Quality Indicators**: "good reviews", "4+ stars", "highly rated"
- **Categories**: electronics, clothing, jewelry
- **Sorting Preferences**: by price, rating, relevance


### Structured Output
Queries are parsed into JSON format:
```json
{
  "keywords": ["wireless", "headphones"],
  "categories": ["electronics"],
  "priceMin": null,
  "priceMax": 100,
  "minRating": null,
  "attributes": [],
  "sortBy": "relevance"
}
```

## Setup Instructions

### API Key Setup
1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Add it to your `.env` file
4. Restart the development server

## File Changes

### New Files Created
- `src/utils/nlpSearch.js` - Core NLP functionality
- `src/components/NaturalLanguageSearch.jsx` - Search component
- `.env.example` - Environment variable template

### Modified Files
- `src/components/ProductCatalog.jsx` - Integrated NLP search
- `src/components/index.js` - Exported new component
- `package.json` - Added OpenAI dependency

## Technical Details

### Error Handling
- Graceful fallback to keyword search if OpenAI API fails
- User-friendly error messages via toast notifications
- Loading states during API calls

## Usage

1. Navigate to the Product Catalog page
2. Use the "Natural Language Search" card at the top
3. Enter conversational queries like "Show me cheap electronics"
4. View filtered results based on your natural language input
5. Clear NLP search to return to traditional filtering
