import './GuessTheNumber.css';
import React, { useState } from 'react';
import {Form, Button, Modal} from "react-bootstrap"

function GuessTheNumber() {

  const min = 1
  const [max, setMax] = useState('100')

  const setRandomNumber = (min, max) => {
    let result = (Math.floor(Math.random() * (max - min + 1)) + min)
    setHiddenNumber(result)
  }
  
  const [hiddenNumber, setHiddenNumber] = useState('');

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
      console.log("Hidden number is bigger than " + inputValue )
    } else if (hiddenNumber < inputValue) {
      console.log("Hidden number is smaller than " + inputValue )
    } else if (hiddenNumber == inputValue) {
      console.log("You won!")
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
          <Button variant="outline-secondary" style={{fontSize:"19px", marginBottom:"5px"}}>🠋 My number is less than {input} 🠋</Button>
        ) : (
          <Button variant="outline-secondary" style={{fontSize:"19px", marginBottom:"5px"}}>🠉 My number is bigger than {input} 🠉</Button>
        )}
      </div>
    ))
  }

  const handleNewGame = () => {
    window.location.reload()
  }

  const [starting, setStarting] = useState(true)

  const startGame = (event) => {
    event.preventDefault();
    setStarting(false)
    setRandomNumber(parseInt(min), parseInt(max))
  }


  const handleMaxValueChange = (event) => {
    setMax(event.target.value);
  };

  return (
    <div className="GuessTheNumber">
      <h1>Guess the number</h1>
      <br/>
      <h3>Guessing number between {min} and {max}</h3>
      <Form onSubmit={handleSubmit} className="GuessInput">
        <Form.Control autoFocus  onChange={handleNumberInput} value={inputValue} className="GuessInputForm"/>
        <Button className="GuessInputButton" variant="success" onClick={handleSubmit} type="submit" disabled={isNaN(inputValue) || inputValue == 0}>🡺</Button>
      </Form>
      <br/>
      {renderLastFiveInputs()}
      
      <Modal show={win} centered className="Modal" data-bs-theme="dark">
        <Modal.Header as="h1">
          <Modal.Title>You Won</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The number was {hiddenNumber} <br/>
          Guesses: {oldInputs.length}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"  onClick={handleNewGame} >
            Play again!
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={starting} centered className="Modal" data-bs-theme="dark">
        <Modal.Header as="h1">
          <Modal.Title>Game settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={startGame}>
          <Form.Control autoFocus onChange={handleMaxValueChange} placeholder="100"/>
          <Button variant="primary" type="submit" onClick={startGame} disabled={isNaN(max) || min >= max} style={{marginTop: "20px"}}>
            Start with {max}!
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default GuessTheNumber