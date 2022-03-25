export const feedTemplate = `<!-- para el buscador-->
<header>
<div class="container-search-photo-nav">
    <figure>
    <a href = "/profile"><img id="userPhoto" class='photo-user' src='img/profile-user.png' alt="foto de perfil"></a>
    <figcaption id="nameUser" class="">Username</figcaption>
    </figure>
    <div class="container-search">
        <input class="input-search" placeholder=" Buscar"/>
        <img class="search-logo" src="img/search-logo.png" alt="lupita">
    </div>
</div >

<!-- para la navegación -->
<nav class="container-search-photo-nav width-content">
    <img class="logo-wall"  src="img/web-content.png" alt="logo para el muro">
    <img class="logo-computer" src="img/logo5.png" alt="una computadora(logo de aplicación)">

      <div><label class="nav-lines" id="checkLabelShow"> &#8801 </label>
          <ul class="container-options-nav"   >
              <li><a href="#" id="">Configurar cuenta</a></li>
              <li><a href="#" id="">Eliminar cuenta</a> </li>
              <li><a href="#" id="">Privacidad</a> </li>
              <li><a href="#" id="">Cerrar cuenta</a></li>

          </ul>
      </div>

</nav>
</header>
`;
