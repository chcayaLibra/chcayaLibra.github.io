//资源加载
window.addEventListener('load', function () {
  const loading = document.querySelector('.loading');
  setTimeout(function () {
    loading.style.opacity = 0;
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
})

// 角色移动 / 点击特效
const n = document.documentElement;
const click = document.querySelector('.click');

const role = document.querySelector('.role');
n.addEventListener('click', function (e) {
  role.style.left = `${e.offsetX - role.clientWidth / 2}px`;

  click.style.left = `${e.offsetX - click.clientWidth / 2}px`;
  click.style.top = `${e.offsetY - click.clientHeight / 2}px`;

  click.classList.add('click-animation');
  setTimeout(function () {
    click.classList.remove('click-animation');
  }, 500);
});
