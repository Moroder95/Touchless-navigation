import React from 'react'

import { ExampleComponent, Grid} from 'cant-touch-this'

import 'cant-touch-this/dist/index.css'
const test = [1,2,3,4,5,6,7,8,9];
const App = () => {
  return( 
  <>
    <ExampleComponent text="Create React Library Example 😄" />
    <Grid columns={3}>
      {test.map(el =>{
        return <div>dws</div>
      })}
    </Grid>
    

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
