import React from 'react'

import { ExampleComponent, TouchlessApp, Touchless, Grid, MobileQR } from 'cant-touch-this'

import 'cant-touch-this/dist/index.css'
import MyCheckbox from './MyCheckbox';

const test = [1,2,3,4,5,6,7,8];
const test4 = [1,2,3,4,5,6,7,8,9];
const test2 = [1, 2];
const test3 = [1, 2];
const App = () => {
  return( 
  <>
  
    <TouchlessApp startElement={4} secondaryThreshold={10} >
      <MobileQR />
    <ExampleComponent text="Create React Library Example 😄" />
      <Grid columns={3}>
        {test.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "orange", color: "white"}} key={index} onClick={(e: any)=>{
            e.currentTarget.classList.toggle("penis");
            console.log(e.currentTarget)
          }}>{el}</Touchless>
        })}
      </Grid>
      <ExampleComponent text="Create React Library Example 😄" />
      <Grid columns={7}>
        {test4.map((el, index) =>{
          return(
            <MyCheckbox id={'test' + index} value={'vehicle'+el} key={index}>
              {'this is checkbox number: ' + index}
            </MyCheckbox>
          )
        })}
      </Grid>
      <Grid columns={4}>
        {test.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "blue", color: "white"}} key={index}>{el}</Touchless>
        })}
      </Grid>  
      <Grid columns={2}>
        {test3.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "red", color: "white"}} key={index}>{el}</Touchless>
        })}
      </Grid>
      <p> DAMN SHIT, WHERE'S MY HOTDOG????!?!!?!? 420 blaze it</p>
      <Grid>
        {test2.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "yellow", color: "black"}} key={index}>{el}</Touchless>
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
    </TouchlessApp>
  </>)
}

export default App
