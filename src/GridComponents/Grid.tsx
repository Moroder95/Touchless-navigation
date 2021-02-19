import * as React from 'react';
import {Children} from 'react'
import { useState } from 'react';
import GridItem from './GridItem';
import styles from '../styles.module.css'

export interface GridProps {
   children?: React.ReactNode
   columns?: number,
   controlled?: boolean
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const Grid: React.SFC<GridProps> = ({children, columns, controlled}) => {

 const [isControlled, setIsControlled ] = useState<boolean>(controlled === undefined ? false : controlled);
 const [x, setX] = useState(0);
 const [y, setY] = useState(0);
 const gridRef = React.useRef(null);
 
 React.useEffect(()=>{
    
    if(gridRef?.current === document.querySelector('.'+styles.grid)){
       setIsControlled(true);
    }
 }, [gridRef, setIsControlled]);

React.useEffect(()=>{
    // console.log(controlled, 'controlled is updateds
    if(controlled === true){
        // console.log(controlled)
        setIsControlled(true)
    }
}, [controlled, setIsControlled]);

React.useEffect(()=>{
    
    if(isControlled && controlled){
        const amountOfItems: number = Children.count(children);

        const cols: number = columns ? columns : 1;
        const rows: number = Math.ceil(amountOfItems / cols);
        const keyEvents = (e: KeyboardEvent) => {
            switch(e.key){
                case 'ArrowUp':
                    setY((y:number) =>{
                        if(y > 0){
                            return y-1;
                        }else{
                            //is grid above
                            return y
                        }
                    })
                    break;

                case 'ArrowRight':
                    setX((x:number) =>{
                        //add check to see if if cols is full
                        if(x < cols-1 ){
                            return x+1;
                        }else{
                            //is something above
                            return x;
                        }
                    })
                    break;

                case 'ArrowDown':
                    setY((y:number) =>{
                        
                        if(y < rows-1 ){
                            return y+1;
                        }else{
                            //is something above
                            return y;
                        }
                    })
                    break;
                case 'ArrowLeft':
                    setX((x:number) =>{
                        
                        if(x > 0 ){
                            return x-1;
                        }else{
                            //is something above
                            return x;
                        }
                    })
                    break;

            }
        }
        document.addEventListener('keydown', keyEvents);

        return ()=>{
            document.removeEventListener('keydown', keyEvents)
        }
    }
    else{
        return ()=>{}
    }
    
    
},[isControlled, controlled]);

    return ( 
        <div className={styles.grid} ref={gridRef} style={{gridTemplateColumns: "auto ".repeat(columns ? columns : 1), display:'grid', border: "1px solid " + getRandomColor(), margin: "2px"}}>
            
            {children && (children as Array<React.ReactNode>).map((child: any, index: number)=>{
                
                const col = columns? columns : 1;
                const posX = index % col;
                const posY = (index - posX) / col;
                const active = (isControlled ) && posX === x && posY === y;
                if(child.type.name === 'Grid'){
         
                    
                    return (
                        <Grid columns={child.props.columns} controlled={isControlled && index === y} key={index}>
                            {child.props.children}
                        </Grid>
                        
                    )
                }else
                    return(
                        <GridItem key={index} posX={posX} posY={posY} active={active}>
                            {child}
                        </GridItem>         
                    )
            })}
        </div>
     );
}
 
export default Grid;