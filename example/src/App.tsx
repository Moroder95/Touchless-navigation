import React from 'react'

import { ExampleComponent, Touchless, TouchlessApp} from 'cant-touch-this'

import 'cant-touch-this/dist/index.css'
const test = [1,2,3,4,5,6,7,8,9];
const App = () => {
  return( 
  <>
    <ExampleComponent text="Create React Library Example 😄" />
    <TouchlessApp>
      {test.map(el =>{
        return (
          <Touchless key={el}>
            <div style={{background: 'dodgerblue'}}>{el}</div>
          </Touchless>)
      })}
      <div style={{width: "100vw", display: 'flex', margin: '0 20%', flexWrap: 'wrap'}}>
      {test.map(el =>{
        return (
          <Touchless key={el}>
            <div>{el}</div>
          </Touchless>)
      })}
      </div>

    </TouchlessApp>
    

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
