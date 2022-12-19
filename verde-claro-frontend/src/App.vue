<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home">
        VERDEClaro Store
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Productos</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
              aria-expanded="false">Administracion</a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" to="/categorias">Categorias</router-link>
              <router-link class="dropdown-item" to="/marcas">Marcas</router-link>
              <router-link class="dropdown-item" to="/medidas">Unidad Medida</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/usuarios">Usuarios</router-link>
              <router-link class="dropdown-item" to="/departamentos">Departamentos</router-link>
              <router-link class="dropdown-item" to="/ciudades">Ciudades</router-link>
            </div>
          </li>
        </ul>

        <div class="d-flex">
          <i class="fa fa-user icons me-2" data-bs-toggle="offcanvas" href="#offlogin" role="button"
            aria-controls="offlogin"></i>
          <i class="fa fa-shopping-cart ms-2 icons" data-bs-toggle="offcanvas" href="#offcarrito" role="button"
            aria-controls="offcarrito"></i>
          <i class="fa fa-user-times icons invisible"></i>
        </div>

      </div>
    </div>
  </nav>



  <div class="offcanvas offcanvas-start" tabindex="-1" id="offlogin" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Ingresar</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="card">
        <div class="card-body">
          <input class="form-control mb-2" placeholder="Usuario" />
          <input class="form-control mb-2" placeholder="Contraseña" />
          <div class="d-flex">
            <button class="btn btn-success btn-sm ms-auto">Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcarrito" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Carrito de compras</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="card">
        <div class="card-body">

          <table class="table text-sm" id="tblPedido">
            <thead class="text-center">
              <th>Producto</th>
              <th>Cant</th>
              <th>Total</th>
            </thead>
            <tbody> </tbody>
          </table>
          <div class="d-flex pt-3">
            <button class="btn btn-success btn-sb ms-auto">Realizar pedido</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">

  </div>
  <router-view />
</template>

<style>
body {
  margin-top: 2%;
}
</style>
