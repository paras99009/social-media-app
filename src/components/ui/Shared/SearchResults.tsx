import { Models } from 'appwrite';

import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultsProps ={
  isSearchFetching: boolean,
  searchedPosts: Models.Document[]


}

function SearchResults({isSearchFetching,searchedPosts}: SearchResultsProps) {
  if(isSearchFetching){
    return (
      <Loader/>
    )
  }

  if (searchedPosts.length > 0) { 
    return <GridPostList post={searchedPosts} /> 
  }
  return (
    <p className='text-light-4 mt-10 w-full '> 
      No results found

      
    </p>
  )
}

export default SearchResults
