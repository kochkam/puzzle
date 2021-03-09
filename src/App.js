import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'




class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    valid : "Neutral",
    button: 1,
    }
  }
   // Sources Cited: https://stackoverflow.com/questions/34658756/find-the-highest-subset-of-an-integer-array-whose-sums-add-up-to-a-given-target
  subset_sum(n,a){
    if (n < 0)   return null;       // Nothing adds up to a negative number
    if (n === 0) return [];         // Empty list is the solution for a target of 0
  
    // RECURSIVE CASE
    a = a.slice();
    while (a.length) {              // Try remaining values
      var v = a.splice(a.indexOf(Math.floor(Math.random() * a.length)),1)            // Take a random value from array
      var s = this.subset_sum(n - v[0], a); // Find solution recursively
      if (s) return s.concat(v[0]);    // If solution, return
    }

  }

  sum(array){ //sums up an array 
    var sum; 
    return sum = array.reduce(function(a, b){
      return a + b;
  }, 0);
  }
 

  

  solveCol(targetSum,id){ //function solves column of puzzle correctly
    var solved = false;
    var sol; 
    var oldid; 
    var newindex = parseInt(id.id) + 8 //get next square in column
    oldid = id = document.getElementById(newindex.toString()) 
    var validAns = [1,2,3,4,5,6,7,8,9];
    
    var counter = 0; 
    while (id.className != "darksquare custom-select" && newindex < 73) { //check every white square in column
      counter = counter + 1 //count the total white squares in column
      newindex = parseInt(id.id) + 8
      if (newindex < 73) {
        id = document.getElementById(newindex.toString())}
      }
    while (solved == false) {
      var temp = validAns; 
      sol = this.subset_sum(targetSum,temp) //find subset of numbers in array that equal the target sum
      if (sol.length == counter) { //check if the correct number of squares are used to solve problem 
        solved = true; 
      }
    }
    counter = 0;
    newindex =  parseInt(oldid.id); 
    while (oldid.className != "darksquare custom-select" && newindex < 73) { //fill in each square with correct answer in column
      oldid.value = sol[counter].toString();
      counter = counter + 1
      newindex = parseInt(oldid.id) + 8
      if (newindex < 73) {
        oldid = document.getElementById(newindex.toString())}
      }

  }


  solvePuzzle(startingindex, targetindex){ //solve puzzle
    var solved = false; 

    while (solved == false) {
        
      
      for (var index = startingindex; index < targetindex; index++) { //solve a puzzle of a target size
        var id = document.getElementById(index.toString())
        if (id.className === "darksquare custom-select" && id.value != "") { //if square is a labeled dartk square
          var answer = id.value;
          var one = answer.split("\\")
          if (one[0] == "") { //solve row

            //needs to be implemented
            }
        
          else if(one[1] === "" && one[0] !== ""){
            this.solveCol(one[0],id); //solve column
          }
          else{
            this.solveCol(one[0],id);
           // solve row as well
          }
        }
        
      }
      solved = true; //would add if statement here with verification algo
      }

    }

  

  checkColumn(colSum,id){ //check column
    var validAns = ["1","2","3","4","5","6","7","8","9"];
    var ans = parseInt(colSum)
    var total = 0;
    var newindex = parseInt(id.id) + 8 //get next square
    if (newindex > 72) {
      return true
    }
    id = document.getElementById(newindex.toString())
    if (id.className == "darksquare custom-select") { //check if next square is a white square or not
      return true; 
    }

    while (id.className != "darksquare custom-select" && newindex < 73) { //while square is white
      if (validAns.includes(id.value)) { //if value is in valid answer array
      validAns.splice(validAns.indexOf(id.value),1) //pop off that value in array which marks it as used
      total = total + parseInt(id.value)
      newindex = parseInt(id.id) + 8 //go to next square
      if (newindex < 73) {
        id = document.getElementById(newindex.toString())}
      }
      else return false; 
    }
    if (total.toString() != colSum) { //if total sum is not equal to target return false
      return false
    }
    return true
  }

  checkRow(rowSum, id) { //checks row similar to above code
    var validAns = ["1","2","3","4","5","6","7","8","9"];
    var total = 0;
    var newindex = parseInt(id.id) + 1
    if (newindex > 72) {
      return true
    }
    id = document.getElementById(newindex.toString())
    if (id.className == "darksquare custom-select") {
      return true; 
    }

    while (id.className != "darksquare custom-select" && newindex < 73) { //for each white square in row
      if (validAns.includes(id.value)) {
      validAns.splice(validAns.indexOf(id.value),1) //pop off value if used
      total = total + parseInt(id.value)
      newindex = parseInt(id.id) + 1
      if (newindex < 73) {
        id = document.getElementById(newindex.toString())}
      }
      else return false; //return false if value was already used
    }
    if (total.toString() != rowSum) {
      return false
    }
    return true


  }


checkSolution(start,stop){

  for (let index = start; index < stop; index++) {  //for each square 
    var id = document.getElementById(index.toString())
    var correct = true; 
    var altcorrect = true;
    if (id.className === "darksquare custom-select" && id.value != "") { //check if it is a labeled square
      var answer = id.value;
      var one = answer.split("\\")
      if (one[0] == "") { //calc row
          correct = this.checkRow(one[1],id)
        }
     
      else if(one[1] === "" && one[0] !== ""){ //calc column
        correct = this.checkColumn(one[0],id);
      }
      else{ //calc both
        correct = this.checkColumn(one[0],id);
        altcorrect = this.checkRow(one[1],id)
      }
      if (correct === false || altcorrect === false) { //if either return false solution is false
        return false
      }
    }
    
  }
  return true; //else true

}



validate(event){
  event.preventDefault(); 
  if (this.state.button == 1) {
    
    if (this.checkSolution(1,73)) { //check if solution is correct
      this.setState({valid: "True"})
      
    }
    else {
      this.setState({valid: "False"})}


  }
  else{
    this.solvePuzzle(1,73); //solves puzzle
  }
}

  renderBlankSquare(i, title = ""){ //render dark square
    return(
      <Form.Control as="select" disabled className= 'darksquare' id={i}custom>
        <option value={title}>{title}</option>

        </Form.Control>)
  }
  
  renderSquareAlt(i){ //render white square with drop down 
    return(
        <Form.Control as="select" size="lg"className= 'square' id={i}custom>
        <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>          
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>  
        </Form.Control>
    )
  }


  render(){
    let counter = 1;
    let rows = [];
    var cells = []
    var status; 
    //renders a bunch of squares for board 
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1; 
    cells.push(this.renderBlankSquare(counter,"4\\"))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"12\\"))
    counter = counter + 1; 
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1; 
    cells.push(this.renderBlankSquare(counter,"36\\"))
    counter = counter + 1; 
    cells.push(this.renderBlankSquare(counter,"6\\"))
    counter = counter + 1; 
    cells.push(this.renderBlankSquare(counter,"8\\"))
    counter = counter + 1; 
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;  
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter,"\\7"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"21\\11"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter,"\\36"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"\\14"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"\\6"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"16\\"))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"\\5"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"8\\"))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"14\\14"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"12\\"))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"4\\"))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"\\35"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    cells = []
    cells.push(this.renderBlankSquare(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"\\9"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderBlankSquare(counter,"\\4"))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    cells.push(this.renderSquareAlt(counter))
    counter = counter + 1;
    rows.push(<Form.Row className='row'>{cells}</Form.Row>)
    if (this.state.valid == "False") { //display if solution is invalide
      status = "Invalid Solution"
    }
    else if(this.state.valid == "True") { 
      status = "Correct"}
    else {
      status = ""
    }


    







    return( //return form 
      <div>
      <Form key="main"onSubmit={this.validate.bind(this)} >
      {rows}
      <Button type="submit" variant="primary" onClick={() => (this.setState({button: 1}))}>Check Solution</Button>
      <Button type="submit" variant="secondary" onClick={() => (this.setState({button: 2}))}>Solve Puzzle</Button>
      </Form>
      <div>{status}</div>
      </div>
    







    )

  }


}





class Game extends React.Component {
  render() {
    return (
      <div className="game">
      <br></br>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
export default Game
