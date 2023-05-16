document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const dooler = document.createElement("div");

  let doolerLeftstate = 50;
  let StartPoint = 150;
  let doolerBottomstate = StartPoint;
  let IsGameOver = false;
  let platformCount = 5;
  let Platforms = [];
  let UpTimerId;
  let DownTimerId;
  let IsJumping = false;
  let IsGoingLeft = false;
  let IsGoingRight = false;
  let LeftTimerId;
  let RightTimerId;
  let score = 0;

  function creatDooler() {
    grid.appendChild(dooler);
    dooler.classList.add("dooler");
    doolerLeftstate = Platforms[0].left;
    doolerBottomstate = StartPoint;
    console.log(doolerBottomstate);
    dooler.style.left = doolerLeftstate + "px";
    dooler.style.bottom = doolerBottomstate + "px";
  }

  function Start() {
    if (!IsGameOver) {
      createPlatform();
      creatDooler();
      setInterval(moveplatforms, 30);
      jump();
      document.addEventListener("keyup", controll);
    }
  }

  class Platform {
    constructor(newPlatButtom) {
      this.bottom = newPlatButtom;
      this.left = Math.random() * 315;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  function createPlatform() {
    for (let i = 0; i < platformCount; i++) {
      let platGap = 600 / platformCount;
      let newPlatButtom = 100 + i * platGap;
      let Newplatform = new Platform(newPlatButtom);
      Platforms.push(Newplatform);
      console.log(Platforms);
    }
  }

  function moveplatforms() {
    if (doolerBottomstate > 200) {
      Platforms.forEach((plarform) => {
        plarform.bottom -= 4;
        let visual = plarform.visual;
        visual.style.bottom = plarform.bottom + "px";

        if (plarform.bottom < 10) {
          let fristplatform = Platforms[0].visual;
          fristplatform.classList.remove("platform");
          score++;
          Platforms.shift();
          console.log(Platforms);
          let newplat = new Platform(600);
          Platforms.push(newplat);
        }
      });
    }
  }

  function jump() {
    IsJumping = true;
    clearInterval(DownTimerId);
    UpTimerId = setInterval(() => {
      doolerBottomstate += 10;
      dooler.style.bottom = doolerBottomstate + "px";
      if (doolerBottomstate > StartPoint + 200) {
        fall();
      }
    }, 30);
  }

  function fall() {
    IsJumping = false;
    clearInterval(UpTimerId);
    DownTimerId = setInterval(() => {
      doolerBottomstate -= 5;
      dooler.style.bottom = doolerBottomstate + "px";
      if (doolerBottomstate <= 0) {
        GameOver();
      }
      Platforms.forEach((platform) => {
        if (
          doolerBottomstate >= platform.bottom &&
          doolerBottomstate <= platform.bottom + 15 &&
          doolerLeftstate + 60 >= platform.left &&
          doolerLeftstate <= platform.left + 85 &&
          !IsJumping
        ) {
          console.log("landed");
          StartPoint = doolerBottomstate;
          jump();
        }
      });
    }, 30);
  }

  function GameOver() {
    console.log("game over");
    IsGameOver = true;
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = `Score:${score}`;
    clearInterval(UpTimerId);
    clearInterval(DownTimerId);
    clearInterval(LeftTimerId);
    clearInterval(RightTimerId);
  }

  function controll(e) {
    if (e.keyCode === 37) {
      moveleft();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 38) {
      movestranght();
    }
  }

  function moveleft() {
    if (IsGoingRight) {
      clearInterval(RightTimerId);
      IsGoingRight = false;
    }
    IsGoingLeft = true;
    LeftTimerId = setInterval(function () {
      if (doolerLeftstate >= 0) {
        doolerLeftstate -= 5;
        dooler.style.left = doolerLeftstate + "px";
      } else moveRight;
    }, 30);
  }

  function moveRight() {
    if (IsGoingLeft) {
      clearInterval(LeftTimerId);
      IsGoingLeft = false;
    }
    IsGoingRight = true;
    RightTimerId = setInterval(function () {
      if (doolerLeftstate <= 340) {
        doolerLeftstate += 5;
        dooler.style.left = doolerLeftstate + "px";
      } else moveleft();
    }, 30);
  }

  function movestranght() {
    IsGoingLeft = false;
    IsGoingRight = false;
    clearInterval(LeftTimerId);
    clearTimeout(RightTimerId);
  }
  Start();
});
