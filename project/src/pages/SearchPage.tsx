import React from 'react';
import { useParams } from 'react-router-dom';
import SearchResults from '../components/Search/SearchResults';

const SearchPage: React.FC = () => {
  const params = useParams();
  const categoryFromPath = params.category as string | undefined;
  return <SearchResults initialCategory={categoryFromPath} />;
};

export default SearchPage;