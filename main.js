
let rainbow_viewWidth = document.body.clientWidth;
let rainbow_viewHeight = document.body.clientHeight;
class Rainbow {
  constructor(settings) {
    this.max_age = settings && settings.max_age || 2000;
    this.max_count = settings && settings.max_count || 1000;
    this.frame_rate = settings && settings.frame_rate || 1;
    this.top_left_color = settings && settings.top_left_color || 'rgb(204,0,255)';
    this.top_right_color = settings && settings.top_right_color || 'rgb(0,255,255)';
    this.bottom_left_color = settings && settings.bottom_left_color || 'rgb(255,112,12)';
    this.bottom_right_color = settings && settings.bottom_right_color || 'rgb(255,10,130)';
    
    this.array_top_left = [];
    this.array_top_right = [];
    this.array_bottom_left = [];
    this.array_bottom_right = [];
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
  }

  init() {
    this.canvas.width = rainbow_viewWidth;
    this.canvas.height = rainbow_viewHeight;
    this.ctx.lineWidth = 1;
    this.ctx.globalAlpha = 0.95;

    for(let i=0; i<this.max_count; i++){
      this.array_top_left.push(new particle_top_left(this.max_age));
      this.array_top_right.push(new particle_top_right(this.max_age));
      this.array_bottom_left.push(new particle_bottom_left(this.max_age));
      this.array_bottom_right.push(new particle_bottom_right(this.max_age));
    }

    requestAnimationFrame(this.current);
  }

  detectBorder(particle) {
    if(particle.nx < 0 || particle.nx > rainbow_viewWidth){
        particle.stepx *= -1;
        particle.nx += particle.stepx;
    }
    if(particle.ny < 0 || particle.ny > rainbow_viewHeight){
        particle.stepy *= -1;
        particle.ny += particle.stepy;
    }
  }

  change_particle(particle, new_particle){
      particle.x = new_particle.x;
      particle.y = new_particle.y;
      particle.nx = new_particle.nx;
      particle.ny = new_particle.ny;
      particle.stepx = new_particle.stepx;
      particle.stepy = new_particle.stepy;
      particle.age = new_particle.age;
  }

  drawParticle(particle) {
      this.detectBorder(particle);
      
      this.ctx.beginPath();
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.lineTo(particle.nx, particle.ny);
      this.ctx.closePath();
      this.ctx.stroke();

      particle.x = particle.nx;
      particle.y = particle.ny;
      particle.nx += particle.stepx * this.frame_rate;
      particle.ny += particle.stepy * this.frame_rate;
      particle.age++;
  }

  c_top_left() {
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.strokeStyle = this.top_left_color;
      for (let particle of this.array_top_left) {
          if(particle.age > this.max_age){
              let new_particle = new particle_top_left(this.max_age);
              this.change_particle(particle, new_particle);
          }
          this.drawParticle(particle);
      }
  }
  
  c_top_right() {
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.strokeStyle = this.top_right_color;
      for (let particle of this.array_top_right) {                
          if(particle.age > this.max_age){
              let new_particle = new particle_top_right(this.max_age);
              this.change_particle(particle, new_particle);
          }
          this.drawParticle(particle);
      }
  }
  
  c_bottom_left() {
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.strokeStyle = this.bottom_left_color;
      for (let particle of this.array_bottom_left) {
          if(particle.age > this.max_age){
              let new_particle = new particle_bottom_left(this.max_age);
              this.change_particle(particle, new_particle);
          }
          this.drawParticle(particle);
      }
  }
  
  c_bottom_right() {
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.strokeStyle = this.bottom_right_color;
      for (let particle of this.array_bottom_right) {                
          if(particle.age > this.max_age){
              let new_particle = new particle_bottom_right(this.max_age);
              this.change_particle(particle, new_particle);
          }
          this.drawParticle(particle);
      }
  }

  current = () => {
      this.c_top_left();
      this.c_top_right()
      this.c_bottom_left();
      this.c_bottom_right();
      requestAnimationFrame(this.current);
  }
}

class particle_top_left {
    constructor(max_age){
        this.x = Math.random() * (rainbow_viewWidth/4) + (rainbow_viewWidth/4);
        this.y = 0;
        this.stepx = -1;
        this.stepy = 1;
        this.nx = this.x + this.stepx;
        this.ny = this.y + this.stepy;
        this.age = Math.random() * max_age;
    }
}
class particle_top_right {
    constructor(max_age){
        this.x = Math.random() * (rainbow_viewWidth/4) + (rainbow_viewWidth/2);
        this.y = 0;
        this.stepx = 1;
        this.stepy = 1;
        this.nx = this.x + this.stepx;
        this.ny = this.y + this.stepy;
        this.age = Math.random() * max_age;
    }
}
class particle_bottom_left {
    constructor(max_age){
        this.x = Math.random() * (rainbow_viewWidth/4) + (rainbow_viewWidth/4);
        this.y = rainbow_viewHeight;
        this.stepx = -1;
        this.stepy = -1;
        this.nx = this.x + this.stepx;
        this.ny = this.y + this.stepy;
        this.age = Math.random() * max_age;
    }
}
class particle_bottom_right {
    constructor(max_age){
        this.x = Math.random() * (rainbow_viewWidth/4) + (rainbow_viewWidth/2);
        this.y = rainbow_viewHeight;
        this.stepx = 1;
        this.stepy = -1;
        this.nx = this.x + this.stepx;
        this.ny = this.y + this.stepy;
        this.age = Math.random() * max_age;
    }
}