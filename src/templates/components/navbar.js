import { firebaseLogout } from '../../lib/firebase.js';
import { createPostModal } from '../modals/composePostModal.js';

export const navbarMenu = () => {
  const containerNavbar = document.createElement('div');
  containerNavbar.className = 'containerNavBar';
  const navbar = `
  <nav class="menu"> 
    <ul class="menuList">
      <li class="menuItem">
        <a id="logoutButton" class="links">
          <svg width="100" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M24 15C23.4477 15 23 15.4477 23 16V19C23 19.5523 23.4477 20 24 20C24.5523 20 25 19.5523 25 19V17H31V31H25V29C25 28.4477 24.5523 28 24 28C23.4477 28 23 28.4477 23 29V32C23 32.5523 23.4477 33 24 33H32C32.5523 33 33 32.5523 33 32V16C33 15.4477 32.5523 15 32 15H24ZM18.2929 20.2929C18.6834 19.9024 19.3166 19.9024 19.7071 20.2929C20.0976 20.6834 20.0976 21.3166 19.7071 21.7071L18.4142 23H28C28.5523 23 29 23.4477 29 24C29 24.5523 28.5523 25 28 25H18.4142L19.7071 26.2929C20.0976 26.6834 20.0976 27.3166 19.7071 27.7071C19.3166 28.0976 18.6834 28.0976 18.2929 27.7071L15.2929 24.7071C14.9024 24.3166 14.9024 23.6834 15.2929 23.2929L18.2929 20.2929Z" fill="#222222"/>
          </svg>
          <p class="menuItemlabel">Cerrar sesión</p>
        </a>
      </li>
      <li class="menuItem">
        <a href="#home" id="homeButton">
          <svg width="100" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.606 15.2046C24.248 14.9318 23.752 14.9318 23.394 15.2046L15.9129 20.9044C15.4164 21.2827 15.125 21.8711 15.125 22.4953V32C15.125 33.212 16.1904 34 17.25 34H21H27H30.75C31.8096 34 32.875 33.212 32.875 32V22.4953C32.875 21.8711 32.5836 21.2827 32.0871 20.9044L24.606 15.2046ZM28 32H30.75C30.8136 32 30.8551 31.9795 30.875 31.9647V22.4953L24 17.2572L17.125 22.4953L16.519 21.6998L17.125 22.4953V31.9647C17.1449 31.9795 17.1864 32 17.25 32H20V26C20 25.4477 20.4477 25 21 25H27C27.5523 25 28 25.4477 28 26V32ZM22 32H26V27H22V32Z" fill="#EAEAEA"/>
          </svg>
          <p class="menuItemlabel">Home</p>
        </a>
      </li>
      <li class="menuItem">
        <a id="createPostId">
          <svg width="100" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M24.8992 22.5358L28.223 19.212L28.9301 19.9191L25.6063 23.2429L24.6305 23.5116L24.8992 22.5358ZM29.6372 17.7978L30.3443 18.5049L31.237 17.6122L31.2373 17.6069L31.2373 17.6067C31.2376 17.5991 31.2384 17.5779 31.2204 17.5332C31.2017 17.4864 31.1421 17.364 30.9601 17.182C30.7781 17 30.6557 16.9405 30.6089 16.9217C30.5642 16.9037 30.543 16.9045 30.5354 16.9048L30.5352 16.9048L30.5299 16.9051L29.6372 17.7978ZM29.285 15.3216C29.3175 15.2891 29.3514 15.2592 29.3901 15.2345C29.6716 15.0548 30.9675 14.3609 32.3743 15.7678C33.7812 17.1746 33.0873 18.4705 32.9076 18.752C32.8829 18.7907 32.853 18.8246 32.8205 18.8571L26.8336 24.844C26.7112 24.9665 26.559 25.055 26.392 25.101L23.4646 25.9071C22.7165 26.1131 22.029 25.4256 22.235 24.6775L23.0411 21.7501C23.0871 21.5831 23.1756 21.4309 23.2981 21.3085L29.285 15.3216ZM16 17C15.4477 17 15 17.4477 15 18V32C15 32.5523 15.4477 33 16 33H31C31.5523 33 32 32.5523 32 32V26C32 25.4477 31.5523 25 31 25C30.4477 25 30 25.4477 30 26V31H17V19H22.5C23.0523 19 23.5 18.5523 23.5 18C23.5 17.4477 23.0523 17 22.5 17H16Z" fill="#222222"/>
          </svg>
          <p class="menuItemlabel">Crear post</p>
        </a>
      </li>
      <li class="menuItem">
        <a href="#profile" id="profileId">
          <svg width="100" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" "clip-rule="evenodd" d="M27 21C27 22.6569 25.6569 24 24 24C22.3431 24 21 22.6569 21 21C21 19.3431 22.3431 18 24 18C25.6569 18 27 19.3431 27 21ZM29 21C29 23.7614 26.7614 26 24 26C21.2386 26 19 23.7614 19 21C19 18.2386 21.2386 16 24 16C26.7614 16 29 18.2386 29 21ZM19.0245 26.2903C19.1628 26.1835 19.3303 26.1177 19.505 26.1118C20.016 26.0945 20.2756 26.2136 20.4752 26.4393C20.8604 26.8748 20.6072 27.5818 20.1542 27.9462C19.3213 28.616 18.6773 29.4973 18.306 30.4998H29.693C29.3218 29.4975 28.678 28.6164 27.8454 27.9466C27.3924 27.5822 27.1394 26.875 27.5246 26.4395C27.7243 26.2137 27.9838 26.0947 28.4948 26.1121C28.6693 26.1181 28.8368 26.1839 28.975 26.2906C30.5963 27.5427 31.7152 29.3928 31.9862 31.502C32.0566 32.0498 31.6021 32.4998 31.0499 32.4998H16.9492C16.3969 32.4998 15.9424 32.0498 16.0128 31.502C16.2839 29.3927 17.403 27.5424 19.0245 26.2903Z" fill="#222222"/>
          </svg>
          <p class="menuItemlabel">Perfil</p>
        </a>
      </li>
    </ul>
  </nav>
    `;

  containerNavbar.innerHTML = navbar;
  const logoutButton = containerNavbar.querySelector('#logoutButton');
  logoutButton.addEventListener('click', () => {
    firebaseLogout();
  });

  const createPostButton = containerNavbar.querySelector('#createPostId');
  createPostButton.addEventListener('click', () => {
    document.getElementById('root').appendChild(createPostModal());
  });
  return containerNavbar;
};

export const topNavBar = () => {
  const containerTopBar = document.createElement('div');
  containerTopBar.className = 'containerTopBar';
  const topbar = `
    <nav class="topBar">
    <input type="checkbox" id="topBar__checkbox" class="topBar__checkbox">
    <label for="topBar__checkbox" class="topBar__toggle">
      <svg class="hamburguerMenu" viewBox="0 0 448 512" width="100" title="bars">
        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
      </svg>
      <svg class="close" viewBox="0 0 384 512" width="100" title="times">
        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
      </svg>
    </label>
    <ul class="topBar__menu">
      <li><a>
          #BearHug
        </a></li>
      <li><a>Contacto</a></li>
    </ul>
  </nav>`;
  containerTopBar.innerHTML = topbar;
  return containerTopBar;
};

export const rightBar = () => {
  const containerRightBar = document.createElement('aside');
  containerRightBar.className = 'containerRightBar';

  const menuRightBar = document.createElement('nav');
  menuRightBar.className = 'menu';
  containerRightBar.appendChild(menuRightBar);

  const barList = document.createElement('div');
  barList.className = 'barList';
  menuRightBar.appendChild(barList);

  const userInfo = document.createElement('div');
  userInfo.id = 'userInfo';
  // userInfo.innerHTML = 'Bienvenido usuario: ';
  userInfo.className = 'userInfoClass';
  barList.appendChild(userInfo);

  return containerRightBar;
};
