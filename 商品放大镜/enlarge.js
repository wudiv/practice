function Enlarge(ele){
    this.ele = document.querySelector(ele)
    this.show = document.querySelector('.show')
    this.mask = this.ele.querySelector('.mask')
    this.enlarge =this.ele.querySelector('.enlarge')
    this.list = this.ele.querySelector('.list')
    this.init();
}
// 启动函数
Enlarge.prototype.init =function(){
      this.getProp();
      this.overOut();
      this.setScale();
      this.move();
      this.bindEvent();
}
// 移入移出
Enlarge.prototype.overOut = function(){
    this.show.addEventListener('mouseover',()=>{
        this.mask.classList.add('active')
        this.enlarge.classList.add('active')
    })
    this.show.addEventListener('mouseout',()=>{
        this.mask.classList.remove('active')
        this.enlarge.classList.remove('active')
    })
}
// 获取尺寸
Enlarge.prototype.getProp= function(){
this.mask_width=parseInt(window.getComputedStyle(this.mask).width)
this.mask_height=parseInt(window.getComputedStyle(this.mask).height)
   
this. show_width = this.show.offsetWidth
this. show_height = this.show.offsetHeight
const bg = window.getComputedStyle(this.enlarge).backgroundSize.split(' ')
this.bg_wight = parseInt(bg[0])
this.bg_height = parseInt(bg[1])
}
// 调整比例
Enlarge.prototype.setScale = function(){
   
    
    this.enlarge_width = this.mask_width/this.show_width*this.bg_wight
    this.enlarge_height =this.mask_height/this.show_height*this.bg_height
    
    this.enlarge.style.width= this.enlarge_width+"px"
    this.enlarge.style.height=this.enlarge_height+"px"
}
// 动起来
Enlarge.prototype.move = function(){
    this.show.addEventListener( 'mousemove', e=>{
        e = e||window.event
        let x = e.offsetX-100
        let y = e.offsetY-100

if(x<=0)x=0
if(y<=0)y=0
if(x>=this.show_width-this.mask_width) x = this.show_width-this.mask_width
if(y>= this.show_height-this.mask_height) y=this.show_height-this.mask_height

        this.mask.style.left = x +'px'
        this.mask.style.top = y + 'px'

        const moveX =this.enlarge_width*x/this.mask_width
        const moveY = this.enlarge_height*y/this.mask_height

        this.enlarge.style.backgroundPosition =`-${moveX}px -${moveY}px`
    })
}
// 绑定事件
Enlarge.prototype.bindEvent = function(){
    this.list.addEventListener('click',e=>{
e=e ||window.event
const target = e.target ||e.srcElement

if (target.nodeName ==='IMG'){
    for (let i = 0; i<this.list.children.length; i++){
        this.list.children[i].classList.remove('active')
    }
    target.parentElement.classList.add('active')

    const showImg= target.dataset.show
    const enlargeImg= target.dataset.big

    this.show.firstElementChild.src = showImg
    this.enlarge.style.backgroundImage = `url(${enlargeImg})`
}
    })
}