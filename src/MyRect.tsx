export class MyRect {
    top: number;
    left: number;
    right: number;
    bottom: number
    private x: number;
    private y: number;
    id: any;

    constructor(element : (HTMLElement | Element)){
        const rect = element.getBoundingClientRect();
        this.top = rect.top;
        this.left = rect.left;
        this.x = ((rect.right - rect.left) / 2) + rect.left;
        this.y = ((rect.bottom - rect.top) / 2) + rect.top;
        this.bottom = rect.bottom;
        this.right = rect.right;
        this.id = element;
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    distanceFromElToCenter = (el: MyRect): number[] =>{
        const valuesToCompare = [
            Math.abs(this.x - el.left),
            Math.abs(el.right - this.x),
            Math.abs(this.y - el.top),
            Math.abs(el.bottom - this.y)
        ].sort((a, b) => a-b);

        return valuesToCompare;
    }
    doRectsCollide = (a: MyRect) => {
        return !(
            ((a.bottom) < (this.top)) ||
            (a.top > (this.bottom)) ||
            ((a.right) < this.left) ||
            (a.left > (this.right))
    );
}

}