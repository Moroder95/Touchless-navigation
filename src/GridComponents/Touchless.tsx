import * as React from 'react';
import {  useState, Children, useMemo } from 'react';
import Grid from './Grid';

export interface TouchlessProps {
  children: React.ReactNode
}

// Arrow key navigation funktionalitet

const Touchless: React.SFC<TouchlessProps> = ({children}) => {
    // State management om hvilket grid der er i fokus - x,y

    const [y, setY] = useState(0);

    const [x, setX] = useState(0);

    const gridChange = (key: string) =>{
        const amountOfItems: number = Children.count(children);
        
        if (key === 'ArrowUp') {
            if(y > 0){
                setY((oldY: number) => oldY-1);
            }
        }
        else if(key === 'ArrowDown'){
            console.log(y, amountOfItems)
            if(y + 1 < ySteps.length ) { 
                               
                setY((oldY: number) => oldY+1);
            }
        } else {
            console.log("A key event that is not recognized was sent to the gridChange function: " + key);
        }
    }
    const childrenArray = React.useMemo(()=>{
        const amountOfItems: number = Children.count(children);
        return amountOfItems <= 1 ? [children] as Array<React.ReactNode> : children as Array<React.ReactNode>;
    }, [children]);

    const ySteps = useMemo(()=>{
        return childrenArray.map((child: any, index: number)=>{
            const type = child.type.name 
            return {i: index, type}
        }).filter((el: {i: number, type: string})=>{
            return el.type === "Grid";
        }).map((el: {i: number, type: string}) => el.i )

    }, [childrenArray]);
    
    
    // Når der modtages besked om at et grid er ved det sidste element eks. down key og der ikke er noget under
    // så sendes en besked om at der skal bevæges en grid ned.

    // Ved hvert grid change opdateres x værdien for hvor mange kollonner der er - hvilket bestemmer om der kan køres til
    // venstre og højre
    

    // Wrapper content under sig.

    return ( 
        <div id="touchless">
            
            {childrenArray && childrenArray.map((child: any, index: number)=>{
                if(child.type.name === 'Grid'){

                    return (
                        <Grid columns={child.props.columns} controlled={ index === ySteps[y]} key={index} gridChange={gridChange} setPosX={setX} bigX={x}>
                            {child.props.children}
                        </Grid>
                    )
                }else
                    return(
                        <div key={index}>
                            {child}  
                        </div>      
                    )
            })}
            
        </div>

    );
}
 
export default Touchless;