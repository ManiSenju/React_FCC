import React from "react";
import axios from 'axios';
import './App.css';

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];
class App extends React.Component{
    state={quotes:[],index:null}

    async componentDidMount (){
        const headers ={
            Accept: 'application/json'
        }
        const response = await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        {headers}
        );
        this.setState({quotes:response.data.quotes});
        this.setState({index:Math.floor(Math.random() * this.state.quotes.length)});
    }

    getRandomQuote() {
        return this.state.quotes[
          this.state.index
        ];
    }

    generateQuote(){
        this.setState({index:Math.floor(Math.random() * this.state.quotes.length)});
    }

    render(){
        const randomQuote = this.getRandomQuote();
        if(randomQuote){
            const color  = colors[Math.floor(Math.random()* colors.length)]
            const styles ={'color':color};
            const thref = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            encodeURIComponent('"' + randomQuote + '" ' + randomQuote.author);
            return (
                <div  id="quote-box" style={styles}>
                    <div id="text">{randomQuote.quote}</div>
                    <div id="author">-{randomQuote.author}</div>
                    <div className="btn-clas">
                        <button id="new-quote" className="ui button" onClick={this.generateQuote.bind(this)}>New quote</button>
                        <a href={thref} target="_blank" id="tweet-quote" ><i className="large icons"><i aria-hidden="true" className="twitter icon"></i></i></a>
                    </div>
                </div>
            )
        }else{
            return <h1>test</h1>;
        }
    }
}

export default App;