import React from 'react'
import { ExampleComponent, Grid, Touchless} from 'cant-touch-this'
import 'cant-touch-this/dist/index.css'
const test = [1,2,3,4,5,6,7,8];
const test4 = [1,2,3,4,5,6,7,8,9];
const test2 = [1, 2];
const test3 = [1, 2];

const App = () => {
  return( 
  <>
    <Touchless>
    <ExampleComponent text="Create React Library Example 😄" />
      <Grid columns={3}>
        {test.map((el, index) =>{
          return <div style={{backgroundColor: "orange", color: "white"}} key={index}>{el}</div>
        })}
      </Grid>
      <ExampleComponent text="Create React Library Example 😄" />
      <Grid columns={7}>
        {test4.map((el, index) =>{
          return <div style={{backgroundColor: "lightBlue", color: "white"}} key={index}>{el}</div>
        })}
      </Grid>
      <Grid columns={4}>
        {test.map((el, index) =>{
          return <div style={{backgroundColor: "blue", color: "white"}} key={index}>{el}</div>
        })}
      </Grid>  
      <Grid columns={2}>
        {test3.map((el, index) =>{
          return <div style={{backgroundColor: "red", color: "white"}} key={index}>{el}</div>
        })}
      </Grid>
      <p> DAMN SHIT, WHERE'S MY HOTDOG????!?!!?!? 420 blaze it</p>
      <Grid>
        {test2.map((el, index) =>{
          return <div style={{backgroundColor: "yellow", color: "black"}} key={index}>{el}</div>
        })}
      </Grid>
      <p>no more grids below, only</p>
      <p>hotdog</p>
      <p>hotdog.</p>
      <p>hotdog..</p>
      <p>hotdog...</p>
      <p>hotdog....</p>
      <p>hotdog.....</p>
      <p>hotdog......</p>
      <p>hotdog.......</p>
    </Touchless>
    


    {/* EXAMPLE STRUCTURE
    <Grid columns={1}>
      <Form>
        <Grid columns={3}>
          <RadioButton/>
          <RadioButton/>
          <RadioButton/>
        </Grid>
      </Form>
      <Form>
        <Grid columns={3}>
          <Checkbox/>
          <Checkbox/>
          <Checkbox/>
        </Grid>
      </Form>
      <Grid columns={2}>
        <Button>Back</Button>
        <Button>Next</Button>
      </Grid>
    </Grid> */}
    
  </>)
}

export default App
