export const profileTemplate = () => {
  console.log('perfil');

  const containerProfile = document.createElement('div');
  containerProfile.className = 'containerProfile';
  const profile = `
    <h1> hola </h1>
    <div class="img">
      <img src="" alt="">
    </div>
    <div class="name">

    </div>
    <div class="bioUser">
    
    </div>
    `;
  containerProfile.innerHTML = profile;
  return containerProfile
};