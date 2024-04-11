class Clock{
  sel 
  domel
  ctx
  
  ts=null;

  constructor(sel){
      this.sel=sel
      this.domel=document.querySelector(this.sel)
      this.ctx=this.domel.getContext('2d')
  }

  draw(ts)
  {
      const ctx=this.ctx

      //reset the context
      ctx.reset()

      // Transform
      ctx.transform(1,0,0,1,150,150)
      this.drawDial()
      this.drawSecondsHand()
  }

      drawDial(ts)
      {
        const ctx=this.ctx

        // Dial(circle)
      ctx.beginPath()
      ctx.arc(0,0,100,0,2*Math.PI)
      ctx.stroke()
      }

      drawSecondsHand(ts)
      {

        let angle,ct,st
        const ctx=this.ctx
        ctx.save()

        //Define initial phase of rotation
        angle=-Math.PI*0.5
        ct=Math.cos(angle)
        st=Math.sin(angle)
        ctx.transform(ct,st,-st,ct,0,0)

        // Rotate again based on ts
        angle=(ts/1000)*(2*Math.PI/60)
        ct=Math.cos(angle)
        st.Math.sin(angle)
        ctx.transform(ct,st,-st,ct,0,0)

        // Seconds hand (line)
      const handSemiWidth=7.5;
      const secondHandLength=75;

      ctx.lineWidth=2*handSemiWidth;
      ctx.beginPath()
      ctx.moveTo(0,0)
      ctx.lineTo(85,0)
      ctx.stroke()

      // Pivot (circle)
      ctx.beginPath()
      ctx.arc(0,0,handSemiWidth,0,2*Math.PI)
      ctx.fill()

      }
}