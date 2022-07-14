import './App.css';
import { Component } from 'react';
import NavBar, {ENTRY, MANAGE, VIEW, DEBUG} from './components/NavBar';
import CreditInput from './components/CreditInput';
import CountryConfig from './components/CountryConfig';
import CountryCheck from './store/CountryCheck';
import CardStore from './store/CardStore';
import ViewCards from './components/ViewCards';
import DummyData from './components/DummyData';

/**
 * Main application class
 */
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {page:ENTRY};
    this.countryCheck = new CountryCheck(); // create country check service to inject into cc component
    this.cardStore = new CardStore();
  }

  setPage(page) {
    this.setState({page: page});
  }

  render() {
    return (
      <div className="App">        
        <header className="App-header">                        
        <NavBar setPage = {(page)=>this.setPage(page)}/>
        </header>
        <div className="App-body">
        {this.state.page === ENTRY && <CreditInput countryCheck={this.countryCheck} cardStore={this.cardStore}/>}
        {this.state.page === VIEW && <ViewCards cardStore={this.cardStore}/>}
        {this.state.page === MANAGE && <CountryConfig countryCheck={this.countryCheck}/>}        
        {this.state.page === DEBUG && <DummyData/>}
        </div>
      </div>
    );
  }
}