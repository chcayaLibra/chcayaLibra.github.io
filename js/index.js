document.addEventListener('DOMContentLoaded', function () {
  const loading = document.querySelector('.loading');
  setTimeout(function () {
    loading.style.opacity = 0;
  }, 2000);
  clearInterval(loadingReset);
});

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


const n = document.documentElement;

const role = document.querySelector('.role');
n.addEventListener('click', function (e) {
  role.style.left = `${e.screenX - role.clientWidth / 2}px`;
});
