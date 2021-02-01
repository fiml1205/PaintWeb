class paint {
    constructor() {
        this.canvas = document.getElementById('board')
        this.canvas.width = 1300
        this.canvas.height = 600
        this.ctx = this.canvas.getContext('2d')
        this.drawBackgound()
        this.color = '#ff0000'
        this.tool = 'pen'
        this.lineWidth = 5
        this.drawing = false  
        this.startPos = {
            x: 0,
            y: 0
        }
        this.currentPos = {
            x: 0, 
            y: 0 
        }

        this.listenEvent()

        // for undo, redo
        this.oldimage = null
        this.newimage = null

    }

    // Can chinh vi tri cua chuot dung voi page html
    getMousePops(evt){
        var rect = this.canvas.getBoundingClientRect()
        return{
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    }

    mousedown(event) {
        this.saveState()
        this.drawing = true
        this.startPos = this.getMousePops(event)   
    }
    
    mouseup() {
        this.drawing = false              
    }
    mousemove(event) {
        let mousePos = this.getMousePops(event)
        if(this.drawing) {
            switch(this.tool){
                case 'pen':
                    this.drawLine(this.currentPos, mousePos)
                break
                case 'line':
                    this.undo();
                    this.drawLine(this.startPos, mousePos)
                    break
                case 'rect':
                    this.undo();
                    this.drawRect(this.startPos, mousePos)
                    break
                case 'circle':
                    this.drawCircle(this.startPos, mousePos)
                    break
                case 'circleNull':
                    this.drawCircleNull()
                    break
            }  
        }
        this.currentPos = mousePos       
    }

    listenEvent() {
        this.canvas.addEventListener('mousedown',(event) => this.mousedown(event))
        this.canvas.addEventListener('mouseup',(event) => this.mouseup(event))
        this.canvas.addEventListener('mousemove',(event) => this.mousemove(event))
    }

    drawRect(startPos, endPos){
        this.ctx.beginPath()
        this.ctx.rect(startPos.x, startPos.y, endPos.x - startPos.x, endPos.y - startPos.y) 
        this.ctx.stroke()
        this.ctx.lineWidth = this.lineWidth 
        this.ctx.strokeStyle = this.color
    }

    drawLine(startPos, endPos) {
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.color
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.x, startPos.y);
        this.ctx.lineTo(endPos.x, endPos.y);
        this.ctx.stroke();
    }

    drawCircle(startPos, endPos) {
        var r = Math.sqrt(Math.pow((endPos.x - startPos.x), 2) + Math.pow((endPos.y - startPos.y), 2));
        this.ctx.beginPath();
        this.ctx.arc(startPos.x, startPos.y, r, 0, 2*Math.PI); 
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.lineWidth
        this.ctx.stroke();
    }

    // save img to undo redo
    saveState() {
        this.oldimage = new Image
        this.oldimage.src = this.canvas.toDataURL("image/bmp", 1.0)
    }

    // 
    undo (){
        this.newimage = new Image
        this.newimage.src = this.canvas.toDataURL("image/bmp", 1.0)
        this.ctx.drawImage(this.oldimage, 0, 0, 1300, 600)
    }

    redo() {
        this.ctx.drawImage(this.newimage, 0, 0, 1300, 600)
    }

    // clear draw
    drawBackgound() {
        this.ctx.fillStyle = "#ffffff"
        this.ctx.fillRect(0, 0, 1300, 600)
    }

    save() {
        var image = this.canvas.toDataURL("image/png");
        var aLink = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("onclick");
        aLink.download = 'image/png';
        aLink.href = image;
        aLink.dispatchEvent(evt);
        
    }
}                                   

var p = new paint()

