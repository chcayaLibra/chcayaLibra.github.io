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

// 角色移动 - 点击特效
const click = document.querySelector('.click');
const role = document.querySelector('.role');
const screen = document.documentElement;
screen.addEventListener('click', function (e) {
  role.style.left = `${e.clientX - role.clientWidth / 2}px`;

  click.style.left = `${e.clientX - click.clientWidth / 2}px`;
  click.style.top = `${e.clientY - click.clientHeight / 2}px`;

  click.classList.add('click-animation');
  setTimeout(function () {
    click.classList.remove('click-animation');
  }, 500);
});

// 移动端滑动
screen.addEventListener('touchmove', function (e) {
  role.style.left = `${e.touches[0].clientX - role.clientWidth / 2}px`;

  click.style.left = `${e.touches[0].clientX - click.clientWidth / 2}px`;
  click.style.top = `${e.touches[0].clientY - click.clientHeight / 2}px`;
});
