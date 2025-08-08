# E-commerce Application with AI Features

## How to run the app

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation & Setup

1. Clone the project
```bash
git clone https://dredsoft-labs-admin@bitbucket.org/dredsoft-labs/ecommerce.git
```

2. Go to the project directory
```bash
cd ecommerce
```

3. Install dependencies
```bash
npm install
```
*Note: If you encounter peer dependency issues, use:*
```bash
npm install react-material-ui-carousel --save --legacy-peer-deps
```

4. Set up environment variables (optional for AI features)
- Create a `.env` file in the root directory
- Add your OpenAI API key: `REACT_APP_OPENAI_API_KEY=your_api_key_here`

5. Start the server
```bash
npm start
```

The application will be running at:
```
http://localhost:3000
```

### Accessing the Product Catalog
Navigate to the product catalog page:
```
http://localhost:3000/catalog
```

## Which AI feature you choose

**Option A – Smart Product Search (NLP)**

I implemented a Natural Language Search feature that allows users to search for products using conversational queries. Users can input natural language searches like:
- "Show me running shoes under $100 with good reviews"
- "Find cheap electronics"
- "Show me highly rated jewelry"

The system uses OpenAI's GPT-3.5-turbo model to parse natural language queries and convert them into structured search criteria that can be applied to the product catalog.

### Key Features:
- Natural language query processing
- Intelligent parsing of price ranges, categories, and quality indicators
- Fallback to keyword search when AI is unavailable
- Real-time search suggestions
- Seamless integration with existing product filters

## Tools/libraries used

### New Library Added:
- **openai (^5.12.1)** - OpenAI API client for natural language processing

## Notable assumptions

1. **OpenAI API Key**: The natural language search feature requires an OpenAI API key. If not provided, the system gracefully falls back to keyword-based search without breaking functionality.

2. **Static Product Data**: The product catalog uses a static JSON dataset of 12 sample products for demonstration purposes. In a production environment, this would be replaced with a dynamic API.

3. **Query Complexity**: The NLP parser is designed to handle common e-commerce search patterns but may not understand highly complex or ambiguous queries.

4. **Rate Limiting**: No rate limiting is implemented for OpenAI API calls, which should be considered for production use.
