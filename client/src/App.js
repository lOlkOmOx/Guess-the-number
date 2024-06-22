import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import {Form, Button, Modal} from "react-bootstrap"

function App() {

  const setRandomNumber = (minValue, maxValue) => {
    let result = (Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue)
    return result
  }
  
  const [hiddenNumber, setHiddenNumber] = useState(0);

  useEffect(() => {
    setHiddenNumber(setRandomNumber(0, 100));
  }, []);


  const [inputValue, setInputValue] = useState('')
  const [oldInputs, setOldInputs] = useState([])
  const [win, setWin] = useState(false)

  const handleNumberInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    generateAnswer()
    setInputValue('');
    addInput(inputValue)
  }

  const generateAnswer = () => {
    if (hiddenNumber > inputValue) {
      console.log("hledané číslo je větší než " + inputValue )
    } else if (hiddenNumber < inputValue) {
      console.log("hledané číslo je menší než " + inputValue )
    } else if (hiddenNumber == inputValue) {
      console.log("Vyhrál jsi!")
      setWin(true)
    }
  }

  const addInput = (newInput) => {
    setOldInputs([...oldInputs, newInput]);
  }

  const renderLastFiveInputs = () => {
    const lastFiveInputs = oldInputs.slice(-5).reverse();
    
    return lastFiveInputs.map((input, index) => (
      <div key={index}>
        {input > hiddenNumber ? (
          <Button variant="secondary" style={{fontSize:"50px", marginBottom:"5px"}}>{input} &gt; X</Button>
        ) : (
          <Button variant="secondary" style={{fontSize:"50px", marginBottom:"5px"}}>{input} &lt; X</Button>
        )}
      </div>
    ));
  };

  const handleNewGame = () => {
    window.location.reload()
  }

  return (
    <div className="App">
      <h1>Guess the number</h1>
      <br/>
      <Form>
        <Form.Control  onChange={handleNumberInput} value={inputValue}/>
        <Button onClick={handleSubmit} variant="primary" type="submit">Zkontrolovat</Button>
      </Form>

      {renderLastFiveInputs()}
      
      <Modal show={win} centered className="Modal">
        <Modal.Header as="h1">
          <Modal.Title>You Won</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The number was {hiddenNumber} <br/>
          You had {oldInputs.length} guesses
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleNewGame} >
            Play again!
          </Button>
        </Modal.Footer>
      </Modal>
       
    </div>
  );
}

export default App;
