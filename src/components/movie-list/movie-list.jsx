import './movie-list.css';
import MovieListItem from '../movie-list-item/movie-list-item';
const MovieList = ({data,onDelete,onToggleProp}) => {
  return (
    <ul className="movie-list">
      {data.map(item=> (
        <MovieListItem key={item.id} 
        {...item} 
        onDelete={()=>onDelete(item.id)} 
        onToggleProp={(e)=>onToggleProp(item.id,e.currentTarget.getAttribute('data-toggle'))}/>
      ))}
    </ul>
  )
}

export default MovieList