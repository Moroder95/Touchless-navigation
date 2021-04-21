import { MyRect } from '../MyRect'

export const cursorClick = (cursorElement: HTMLDivElement, touchlessElements: NodeListOf<Element>)=>{
    const cursorRect: MyRect = new MyRect(cursorElement);
    cursorElement.animate({
        // keyframes
        transform: ['scale(1)', 'scale(0.5)', 'scale(1)'],
        offset: [ 0, 0.3, 1 ],
      }, {
        // timing options
        duration: 400,
        iterations: 1
      });

    const rectCmp = (a:HTMLElement, b:HTMLElement)=>{
        const aDistances = cursorRect.distanceFromElToCenter(new MyRect(a));
        const bDistances = cursorRect.distanceFromElToCenter(new MyRect(b));
        const res1 = aDistances[0] - bDistances[0];
        const res2 = aDistances[1] - bDistances[1];
        return Math.abs(res1) < 2 ? res2 : res1;
    }

    let clickEl = null;
    let collidingElements: HTMLElement[] = [];
    for(let i = 0; i < touchlessElements.length; i++){
        const el = touchlessElements.item(i);
        const myRect: MyRect = new MyRect(el);

        clickEl = cursorRect.doRectsCollide(myRect);
        if(clickEl){
            collidingElements = [...collidingElements, el as HTMLElement];
        }
    }
    
    if(collidingElements.length > 0){
        if(collidingElements.length > 1){
            collidingElements.sort(rectCmp)
        }
        collidingElements[0].click();
    }
    
}