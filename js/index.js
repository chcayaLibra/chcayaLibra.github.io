const n = document.documentElement;

const role = document.querySelector('.role');
n.addEventListener('click', function (e) {
  role.style.left = `${e.screenX - role.clientWidth / 2}px`;
});
