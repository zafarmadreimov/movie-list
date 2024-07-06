import { Component } from "react";
import AppFilter from "../app-filter/App-filter";
import AppInfo from "../app-info/App-info";
import MovieList from "../movie-list/movie-list";
import MovieAddForm from "../movies-add-form/movies-add-form";
import SearchPanel from "../search-panel/search-panel";
import './App.css';
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Empire of Osman',
          viewers: '988',
          favourite: false,
          like:false,
          id: 1
        },
        {
          name: 'Ertugrul',
          viewers: '789',
          favourite: false,
          like:false,
          id: 2
        },
        {
          name: 'Omar',
          viewers: '1091',
          favourite: false,
          like:false,
          id: 3
        }
      ],
      term:'',
      filter:'all',
    };
  }

  onDelete = (id) => {
    this.setState(({ data }) => ({
      data: data.filter(c => c.id !== id),
    }));
  }

  addForm = (e, item) => {
    this.setState(({ data }) => ({
      data: [...data, { ...item, id: uuidv4() ,favourite:false, like:false}],
    }));
  }

   onToggleProp=(id,prop)=> {
    this.setState(({data})=> ({
      data:data.map(item=> {
        if(item.id===id) {
          return {...item, [prop]:!item[prop]}
        }
        return item;
      })
    }))
   }

   searchHandler =(arr,term)=> {
    if(term.length === 0) {
      return arr
    }
    return arr.filter(item=>item.name.toLowerCase().indexOf(term) > -1)
   }
   filterHandler = (arr, filter) => {
		switch (filter) {
			case 'popular':
				return arr.filter(c => c.like)
			case 'mostViewers':
				return arr.filter(c => c.viewers > 800)
			default:
				return arr
		}
	}
  
   updateTermHandler=term=>this.setState({term})

  updateFilterHandler=filter=>this.setState({filter})
  render() {
    const { data,term ,filter} = this.state;
    const allMoviesCount=data.length
    const favouriteMovieCount=data.filter(c => c.favourite).length
    const visibleData=this.filterHandler(this.searchHandler(data,term),filter)
    return (
      <div className="app font-monospace">
        <div className="content">
          <AppInfo allMoviesCount={allMoviesCount} favouriteMovieCount={favouriteMovieCount}/>
          <div className="search-panel">
            <SearchPanel updateTermHandler={this.updateTermHandler}/>
            <AppFilter filter={filter} updateFilterHandler={this.updateFilterHandler}/>
          </div>
          <MovieList onToggleProp={this.onToggleProp} data={visibleData} onDelete={this.onDelete} />
          <MovieAddForm addForm={this.addForm} />
        </div>
      </div>
    );
  }
}

export default App;
