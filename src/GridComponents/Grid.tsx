import * as React from 'react';

export interface GridProps {
   children: React.ReactChild[]
   columns?: number
}

const Grid: React.SFC<GridProps> = ({children, columns}) => {

    return ( 
        <div className="grid" style={{gridTemplateColumns: "auto ".repeat(columns ? columns : 1), display:'grid'}}>
            {children &&  children.map((child: React.ReactChild, index: number)=>{
                return(
                    <div className="grid-child-wrapper" key={index}>
                        {child}
                    </div>            
                )
            })}
        </div>
     );
}
 
export default Grid;