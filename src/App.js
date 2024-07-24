import React, { useState } from 'react';
import styled from 'styled-components';

// Container for the entire application
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

// Header styling
const Header = styled.header`
  width: 100%;
  padding: 20px 0;
  background-color: #0077c8;
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Form container styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Input field styling
const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

// Button styling
const Button = styled.button`
  padding: 10px 20px;
  color: #ffffff;
  background-color: #0077c8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #005fa3;
  }
`;

// Output text styling
const Output = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

function App() {
  // State for the number input
  const [number, setNumber] = useState('');
  // State for the converted words
  const [words, setWords] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      console.log(number);
      const response = await fetch('https://convertod-env.eba-xyiimhck.ap-southeast-2.elasticbeanstalk.com/api/Convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "number": number }), // Send the number in the request body
      });
      const data = await response.json();
      console.log(data);
      setWords(data.words); // Set the response words to state
    } catch (error) {
      console.error("Error converting number:", error);
      setWords("Error converting number");
    }
  };

  return (
    <>
      <Header>Converto</Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <h1>Number to Words Converter</h1>
          <Input
            type="text"
            placeholder="Enter a number"
            value={number}
            onChange={(e) => setNumber(e.target.value)} // Update state on input change
          />
          <Button type="submit">Convert</Button>
        </Form>
        {words && <Output>{words}</Output>} {/* Display the converted words */}
      </Container>
    </>
  );
}

export default App;
