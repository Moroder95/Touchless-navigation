import * as React from 'react';
import { useState } from 'react';
import GridItem from './GridItem';


export interface GridProps {
   children?: React.ReactNode
   columns?: number,
   controlled?: number
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
 const [isControlled, setIsControlled ] = useState(false);
 const [x, setX] = useState(0);
 const [y, setY] = useState(0);

    return ( 
        <div className="grid" style={{gridTemplateColumns: "auto ".repeat(columns ? columns : 1), display:'grid', border: "1px solid " + getRandomColor(), margin: "2px"}}>
            {children &&  (children as Array<React.ReactNode>).map((child: any, index: number)=>{
                const col = columns? columns : 1;
                const posX = index % col;
                const posY = (index - posX) / col;
                const active = isControlled && posX === x && posY === y;
                if(child.type.name === 'Grid'){

                    return (
                        <GridItem key={index} posX={posX} posY={posY} active={active}>
                            {child}
                        </GridItem>
                    )
                    // return <Grid controlled={index} columns={child.props.columns}>
                    //             {child.props.children}
                    //         </Grid>;
                }else
                    return(
                        <GridItem key={index} posX={posX} posY={posY} active={active}>
                            {child}
                        </GridItem>         
                    )
            })}
            {controlled !== undefined ? <div>Controlled: {controlled} </div> : null}
        </div>
     );
}
 
export default Grid;