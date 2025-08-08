import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
console.log("OpenAI API Key:", process.env.REACT_APP_OPENAI_API_KEY);
export const parseNaturalLanguageQuery = async (query) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a product search query parser. Parse natural language search queries into structured criteria. Return a JSON object with these fields:
          - keywords: string[] (product names, types, brands, materials)
          - categories: string[] (from: "electronics", "men's clothing", "women's clothing", "jewelery")
          - priceMin: number or null
          - priceMax: number or null
          - minRating: number or null (1-5 scale)
          - attributes: string[] (colors, materials, sizes, features)
          - sortBy: string ("price_asc", "price_desc", "rating", "relevance")

          Examples:
          "show me wireless headphones under $100" → {"keywords":["wireless","headphones"],"categories":["electronics"],"priceMin":null,"priceMax":100,"minRating":null,"attributes":[],"sortBy":"relevance"}
          "running shoes with good reviews" → {"keywords":["running","shoes"],"categories":["women's clothing","men's clothing"],"priceMin":null,"priceMax":null,"minRating":4.0,"attributes":["running","athletic"],"sortBy":"rating"}
          "cheap electronics sorted by price" → {"keywords":["electronics"],"categories":["electronics"],"priceMin":null,"priceMax":50,"minRating":null,"attributes":[],"sortBy":"price_asc"}
          
          Return only valid JSON.`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.1,
      max_tokens: 200
    });

    const content = response.choices[0].message.content.trim();
    return JSON.parse(content);
  } catch (error) {
    console.error('Error parsing natural language query:', error);
    
    return {
      keywords: query.split(' ').filter(word => word.length > 2),
      categories: [],
      priceMin: null,
      priceMax: null,
      minRating: null,
      attributes: [],
      sortBy: "relevance"
    };
  }
};

export const filterProductsWithNLP = (products, parsedQuery) => {
  let filtered = [...products];

  if (parsedQuery.keywords && parsedQuery.keywords.length > 0) {
    filtered = filtered.filter(product => {
      const searchText = `${product.title} ${product.description}`.toLowerCase();
      return parsedQuery.keywords.some(keyword => 
        searchText.includes(keyword.toLowerCase())
      );
    });
  }

  if (parsedQuery.categories && parsedQuery.categories.length > 0) {
    filtered = filtered.filter(product => 
      parsedQuery.categories.includes(product.category)
    );
  }

  if (parsedQuery.priceMin !== null) {
    filtered = filtered.filter(product => product.price >= parsedQuery.priceMin);
  }

  if (parsedQuery.priceMax !== null) {
    filtered = filtered.filter(product => product.price <= parsedQuery.priceMax);
  }

  if (parsedQuery.minRating !== null) {
    filtered = filtered.filter(product => product.rating >= parsedQuery.minRating);
  }

  if (parsedQuery.attributes && parsedQuery.attributes.length > 0) {
    filtered = filtered.filter(product => {
      const searchText = `${product.title} ${product.description}`.toLowerCase();
      return parsedQuery.attributes.some(attr => 
        searchText.includes(attr.toLowerCase())
      );
    });
  }

  switch (parsedQuery.sortBy) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return filtered;
};

export const getSuggestedQueries = () => [
  "Show me wireless headphones under $100",
  "Cheap electronics sorted by price", 
  "Women's clothing with good reviews",
  "Expensive jewelry over $200",
  "Men's shirts under $50",
  "Electronics with 4+ star rating",
  "Athletic shoes for running",
  "Professional camera equipment",
  "Formal wear for men",
  "Wireless charging accessories"
];