<template>

  <div class="container">

    <div class="row mt-4" id="dataResult">

      <div class="col-md-3 picture" v-for="item in listData" :key="item.id">
        <div class="card mb-4">
          <div class="card-body">
            <div class="box-imagen">
              <figure class="img-principal">
                <img :src="require('@/assets/img/' + item.imagen)" :alt="item.imagen" class=" w-100" />
              </figure>
            </div>
            <h5>{{ item.nombre }}</h5>
            <p>{{ item.descripcion }}</p>
            <div class="d-flex">
              <p class="fw-bold"> <kbd>Dto {{ item.descuento }}%</kbd> </p>
              <p class="fw-bold ms-auto">$ {{ item.precioUnitarioCompra }}</p>
            </div>
            <div class="d-flex">
              <button class="btn btn-outline-success btn-sm ms-auto" @click="findByid(item.id)">Pedir</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import axios from 'axios';
// import Swal from 'sweetalert2'

export default {
  name: 'DepartmentView',

  data() {
    return {
      id: 0,
      descripcion: '',
      descuento: '',
      precioUnitarioCompra: '',
      imagen: '',
      listData: [],
      listValidar: []
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      axios.get('http://localhost:9000/api/productos').then(result => {
        this.listData = result.data
      })
    },

    findByid: function (id) {
      axios.get('http://localhost:9000/api/productos/' + id).then(result => {
        this.id = result.data.id;
        this.nombre = result.data.nombre;
        this.descripcion = result.data.descripcion;
        this.descuento = result.data.descuento;
        this.precioUnitarioCompra = result.data.precioUnitarioCompra;
        this.imagen = result.data.imagen;
        this.estado = (result.data.estado == true ? 1 : 0);

        this.$("#tblPedido").apendto(`<tr><td>`+result.data.nombre+`</td></tr`)



      })
    },

    dataAdd() {
      let data = {
        id: this.id,
        nombre: this.nombre,
        descripcion: this.descripcion,
        descuento: this.descuento,
        precioUnitarioCompra: this.precioUnitarioCompra,
      };
      console.log(data);
    },
    clearList: function () {
      this.id = 0,
        this.id = '',
        this.nombre = '',
        this.descripcion = '',
        this.descuento = '',
        this.precioUnitarioCompra = '',
        this.listData = []
    },

  }
}


</script>
