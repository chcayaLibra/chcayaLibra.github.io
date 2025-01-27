//资源加载
window.addEventListener('load', function () {
  const loading = document.querySelector('.loading');
  const square = document.querySelector('.square');

  setTimeout(function () {
    let i = 0;
    let count = setInterval(function () {
      loading.style.mask = `radial-gradient(circle at ${square.offsetLeft + square.offsetWidth / 2}px ${square.offsetTop + square.offsetHeight / 2}px, transparent ${i}%, rgb(0, 0, 0) 0)`;

      loading.style.webkitMask = `radial-gradient(circle at ${square.offsetLeft + square.offsetWidth / 2}px ${square.offsetTop + square.offsetHeight / 2}px, transparent ${i}%, rgb(0, 0, 0) 0)`;

      i++;
      if (i === 200) {
        clearInterval(count);
      }
    }, 5);
  }, 2000);

  clearInterval(loadingReset);
});

// 加载动画
const loading = document.querySelectorAll('.loading .animation');
let loadingReset = setInterval(function () {
  for (let i = 0; i < loading.length; i++) {
    loading[i].classList.remove('animation');
    setTimeout(function () {
      loading[i].classList.add('animation');
    }, 10)
  }
  console.log(loadingReset);
}, 6000);

// 阻止冒泡
const shade = document.querySelector('.shade');
shade.addEventListener('click', function (e) {
  e.stopPropagation();
});

// 公共属性
const screen = document.documentElement;
const role = document.querySelector('.role');

const rotateYValue = role.style.transform;
const matchRotateYValue = rotateYValue.match(/rotateY\(([^)]+)\)/);

const translateZValue = role.style.transform;
const matchTranslateZValue = translateZValue.match(/translateZ\(([^)]+)\)/);

const floorHeight = Math.max(innerHeight * 0.16216 - 1, 85);

let flag = true;


// 角色点击移动
const click = document.querySelector('.click');
// 换算角色位置并初始化
role.style.left = `${parseInt(role.style.left) * 0.01 * screen.clientWidth}px`;

screen.addEventListener('click', function (e) {
  const clickDistance = e.clientX - role.clientWidth / 2;
  const z = Math.max(screen.clientHeight - e.clientY, 0);

  if (clickDistance > parseFloat(role.style.left)) {
    if (z < floorHeight) {
      role.style.transform = `translateZ(${-z * 1.11}px) rotateY(180deg)`;
    } else {
      role.style.transform = `translateZ(-150px) rotateY(180deg)`;
    }
    setTimeout(function () {
      role.style.left = `${clickDistance}px`;
    }, flag ? 500 : 0);
    flag = false;
  } else {
    if (z < floorHeight) {
      role.style.transform = `translateZ(${-z * 1.11}px) rotateY(0deg)`;
    } else {
      role.style.transform = `translateZ(-150px) rotateY(0deg)`;
    }
    setTimeout(function () {
      role.style.left = `${clickDistance}px`;
    }, flag ? 0 : 500);
    flag = true;
  }

  click.style.left = `${e.clientX - click.clientWidth / 2}px`;
  click.style.top = `${e.clientY - click.clientHeight / 2}px`;

  // 点击特效
  click.classList.add('click-animation');
  setTimeout(function () {
    click.classList.remove('click-animation');
  }, 500);
});

// 角色键盘移动
screen.addEventListener('keydown', function (e) {
  const roleRect = role.getBoundingClientRect();
  const x = roleRect.left;
  const z = Math.max(innerHeight - roleRect.bottom, 0);
  const moveDistanceX = 100;
  const moveDistanceZ = 30;
  const translateZValue = role.style.transform;
  const matchTranslateZValue = translateZValue.match(/translateZ\(([^)]+)\)/);
  let deg = matchRotateYValue[1];
  let px = matchTranslateZValue[1];


  function turnRight() {
    if (parseInt(role.style.left) < screen.clientWidth - role.clientWidth - moveDistanceX) {
      role.style.left = `${x + moveDistanceX}px`;
    } else {
      role.style.left = `${screen.clientWidth - role.clientWidth}px`;
    }
  }

  function turnLeft() {
    if (parseInt(role.style.left) > moveDistanceX) {
      role.style.left = `${x - moveDistanceX}px`;
    } else {
      role.style.left = `0px`;
    }
  }

  function turnUp() {
    if (z < floorHeight - moveDistanceZ) {
      role.style.transform = `translateZ(${-(z + moveDistanceZ * 1.5) * 1.11}px) rotateY(${deg})`;
    }
  }

  function turnDown() {
    if (z > moveDistanceZ) {
      role.style.transform = `translateZ(${-(z - moveDistanceZ) * 1.11}px) rotateY(${deg})`;
    }
  }

  if (e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd') {
    role.style.transform = `translateZ(${px}) rotateY(180deg)`;
    setTimeout(function () {
      turnRight();
    }, flag ? 500 : 0);
    flag = false;
  }

  if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') {
    role.style.transform = `translateZ(${px}) rotateY(0deg)`;
    setTimeout(function () {
      turnLeft();
    }, !flag ? 500 : 0);
    flag = true;
  }

  if (e.key === 'ArrowUp' || e.key === 'W' || e.key === 'w') {
    turnUp();
  }

  if (e.key === 'ArrowDown' || e.key === 'S' || e.key === 's') {
    turnDown();
  }
});

// 移动端滑动
// 解决第一次transform卡顿问题
role.style.transform = 'translateZ(0px) rotateY(0deg)';

document.body.addEventListener('touchmove', function (e) {
  const touchDistance = e.touches[0].clientX - role.clientWidth / 2;
  const translateZValue = role.style.transform;
  const matchTranslateZValue = translateZValue.match(/translateZ\(([^)]+)\)/);
  let px = matchTranslateZValue[1];

  if (touchDistance > parseFloat(role.style.left)) {
    role.style.transform = `translateZ(${px}) rotateY(180deg)`;
    role.style.left = `${touchDistance}px`;
    flag = false;
  } else {
    role.style.transform = `translateZ(${px}) rotateY(0deg)`;
    role.style.left = `${touchDistance}px`;
    flag = true;
  }

  click.style.left = `${e.touches[0].clientX - click.clientWidth / 2}px`;
  click.style.top = `${e.touches[0].clientY - click.clientHeight / 2}px`;
});
