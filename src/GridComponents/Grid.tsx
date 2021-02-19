import * as React from 'react';
import { useState, useMemo, Children } from 'react';
import styles from '../styles.module.css';

export interface GridProps {
   children: React.ReactNode
   columns?: number
   controlled?: boolean;
   gridChange?: (e: string) => void
   setPosX?: (x: number) => void
   bigX?: number
}




const Grid: React.SFC<GridProps> = ({children, columns, controlled, gridChange, setPosX, bigX}) => {
    // Handle position in the grid to be focused
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const rows = useMemo(() => {
        const col = columns || 1;
        return Math.ceil(Children.count(children)/col);
    }, [children])
    const childrenArray = React.useMemo(()=>{
        const amountOfItems: number = Children.count(children);
        return amountOfItems <= 1 ? [children] as Array<React.ReactNode> : children as Array<React.ReactNode>;
    }, [children])
    
    // Calculates column position ranged from 0-1
    React.useEffect(()=>{
        if(setPosX && controlled){
            const col = columns || 1;
            let i = 0;
            let arr = [];
            
            while (i <= 1) {
                arr.push(i);
                i += 1 / (col - 1);
            }
            const res = arr[x]
            setPosX(res)
        }
    }, [setPosX, x, columns, controlled])
    
    // Calculates column position ranged from 0-1 on gridChange
    React.useEffect(()=>{
        if(bigX){
            const col = columns || 1;
            let i = 0;
            let arr = [];
            
            while (i <= 1) {
                arr.push(i);
                i += 1 / (col - 1);
            }

            const closest = arr.reduce((prev, curr,) => {
                return (Math.abs(curr - bigX) < Math.abs(prev - bigX) ? curr : prev);
              });
            
            const res = arr.indexOf(closest);
            const endGap =  childrenArray.length % col;
            if(endGap > 0 && y + 2 === rows && x > endGap - 1){
                                setY((oldY: number) => oldY+1);
                                setX(endGap - 1);
            }
            setX(res);
        }
    }, [bigX, setX])
    // Calculate the size of the current grid - y. (useMemo)
    
    React.useEffect(()=>{
        if(controlled){

            const keyHandler = (e: KeyboardEvent) =>{
                const col = columns || 1;
                switch(e.key){
                    case 'ArrowUp':
                        console.log(e.key)
                        // Up event
                        if(y <= 0  && gridChange){
                            gridChange(e.key);
                            console.log("Ask Touchless component: Is there grid above?");
                        } else {
                            setY((oldY: number) => oldY-1);
                            
                        }
                        break;
                    case 'ArrowDown':
                        if (y < rows - 1){
                            const endGap =  childrenArray.length % col;
                            if(endGap > 0 && y + 2 === rows && x > endGap - 1){
                                setY((oldY: number) => oldY+1);
                                setX(endGap - 1);
                            }else
                                setY((oldY: number) => oldY+1);
                        } else if(y >= rows -1 && gridChange) {
                            gridChange(e.key);
                            console.log("Ask Touchless Component: Is there grid under?");
                        } 
                        break;
                    case 'ArrowRight':
                        console.log(e.key)
                        // Right event
                        if(x < col-1 ){
                            const endGap =  childrenArray.length % col;
                                if(!(endGap > 0 && y === rows-1 && x >= endGap-1)){
                                    setX((oldX: number) => oldX+1);
                                }
                            }
                        break;
                    case 'ArrowLeft':
                        console.log(e.key)
                        // Left event
                        setX((x:number) =>{
                        
                            if(x > 0 ){
                                return x-1;
                            }else{
                                //is something above
                                return x;
                            }
                        })
                        break;
                    case 'Enter':
                        console.log(e.key)
                        // Enter event
                        break;
                }
            }
            document.addEventListener('keydown', keyHandler);
            return () => {
                // console.log('removed')
                document.removeEventListener('keydown', keyHandler);
            }
        } else{
            return ()=> {
                console.log('removed')
            }
        }
            
        
    }, [ controlled, rows, gridChange, y, x,  childrenArray]);
    
    return ( 
        <div className={styles.grid} style={{gridTemplateColumns: "auto ".repeat(columns ? columns : 1), display:'grid'}}>
            {childrenArray && childrenArray.map((child: React.ReactChild, index: number)=>{
                const col = columns? columns : 1;
                const posX = index % col;
                const posY = (index - posX) / col;
                const active = controlled && posX === x && posY === y;
                return(
                    <div className={`${styles['grid-child-wrapper']} ${active? styles.active : ''}`} key={index}>
                        {child}
                    </div> 
                    



                    // <Touchless>
                    
                    // <Grid>
                    //     <GridItemZ></GridItemZ>
                    //     <GridItemZ></GridItemZ>
                    //     <GridItemZ></GridItemZ>
                    // </Grid>

                    // <h1>Noget</h1>

                    // <Grid>
                    //     <GridItemZ></GridItemZ>
                    //     <GridItemZ></GridItemZ>
                    // </Grid>


                    // </Touchless>

                )
            })}
        </div>
     );
}
 
export default Grid;