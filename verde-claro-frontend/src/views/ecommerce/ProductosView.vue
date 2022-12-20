<template>
    <div class="container">
        <form id="department">
            <fieldset>

                <div class="alert alert-success mt-3 p-1 text-center">
                    Registro de Productos
                </div>
                <!-- Datos de entarada del formulario -->
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="card">

                            <a class="btn text-dark" data-bs-toggle="collapse"
                                href="#bodyProducts" id="customer_header">
                                <i class="fa fa-arrow-circle-o-down ms-auto " id="customer_btn"></i>
                                Nuevos productos y/o actualización
                                <i class="fa fa-arrow-circle-o-down ms-auto " id="customer_btn"></i>
                            </a>

                            <div class="collapse card-body" id="bodyProducts">

                                <div class="form-group">
                                    <input type="hidden" v-model="id" />
                                    <div class="row row-cols-2">
                                        <div class="col">
                                            <label class="form-label mt-1">Código</label>
                                            <input type="text" class="form-control" v-model="codigo"
                                                placeholder="Código">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Nombre</label>
                                            <input type="text" class="form-control" v-model="nombre"
                                                placeholder="Nombre o referencia">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Descripcion</label>
                                            <input type="text" class="form-control" v-model="descripcion"
                                                placeholder="Descripcion del producto">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Imagen</label>
                                            <input type="text" class="form-control" v-model="imagen"
                                                placeholder="Nombre del archivo de la imagen con ext">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Cantidad maxima</label>
                                            <input type="text" class="form-control" v-model="cantidadMaxima"
                                                placeholder="Cantidad numero maximo">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Cantidad minima</label>
                                            <input type="text" class="form-control" v-model="cantidadMinima"
                                                placeholder="Cantidad numero minimo">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Stock</label>
                                            <input type="text" class="form-control" v-model="stock"
                                                placeholder="Inventario actual">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Precio unitario</label>
                                            <input type="text" class="form-control" v-model="precioUnitarioCompra"
                                                placeholder="Valor del precio unitario">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Iva</label>
                                            <input type="text" class="form-control" v-model="iva"
                                                placeholder="Valor del iva si aplica">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Decuento</label>
                                            <input type="text" class="form-control" v-model="descuento"
                                                placeholder="Valor del descuento si aplica">
                                        </div>
                                        <div class="col"><label class="form-label mt-1">Estado</label>
                                            <select class="form-select" v-model="estado">
                                                <option disabled :selected="true" value="">-- Seleccione --</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>

                                        <!-- Botones -->
                                        <div class="d-flex mt-3">
                                            <button type="button" class="btn btn-outline-success btn-sm ms-auto"
                                                @click="dataAdd()">Agregar</button>
                                            &nbsp;
                                            <button type="button" class="btn btn-outline-warning btn-sm"
                                                @click="dataUpdate()">Modificar</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <!-- Registros -->
                        <div class="card">
                            <div class="card-body">
                                <div class="alert p-1 text-center">
                                    Lista de Productos
                                </div>
                                <div>
                                    <table class="table table-hover">
                                        <thead class="text-center">
                                            <tr class="table-active">
                                                <td>Codigo</td>
                                                <td>Nombre</td>
                                                <td>descripcion</td>
                                                <td>imagen</td>
                                                <td>cantidad Maxima</td>
                                                <td>cantidad Minima</td>
                                                <td>stock</td>
                                                <td>Precio Unitario</td>
                                                <td>Iva</td>
                                                <td>Descuento</td>
                                                <td>Estado</td>
                                                <td>Acciones</td>
                                            </tr>
                                        </thead>
                                        <tbody id="dataResult">
                                            <tr v-for="item in listData" :key="item.id">
                                                <td>{{ item.codigo }}</td>
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.descripcion }}</td>
                                                <td>{{ item.imagen }}</td>
                                                <td class="text-center">{{ item.cantidadMaxima }}</td>
                                                <td class="text-center">{{ item.cantidadMinima }}</td>
                                                <td class="text-center">{{ item.stock }}</td>
                                                <td>{{ item.precioUnitarioCompra }}</td>
                                                <td class="text-center">{{ item.iva }}</td>
                                                <td class="text-center">{{ item.descuento }}</td>
                                                <td class="text-center">{{ item.estado == true ? 'Activo' : 'Inactivo'
                                                }}</td>
                                                <td class="text-center">
                                                    <i class="fa fa-pencil-square actions text-warning me-1"
                                                        @click="findByid(item.id)"></i>
                                                    <i class="fa fa-trash-o actions text-danger ms-1"
                                                        @click="deleteById(item.id)"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </fieldset>
        </form>


    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'DepartmentView',

    data() {
        return {
            id: 0,
            codigo: '',
            nombre: '',
            estado: '',
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
            axios.get('http://localhost:9000/api/cities').then(result => {
                this.listValidar = result.data
            })
        },
        findByid: function (id) {
            // metodo para consutlar por el ig del boton impreso en la vista
            axios.get('http://localhost:9000/api/productos/' + id).then(result => {
               
                this.codigo = result.data.codigo,
                this.nombre = result.data.nombre,
                this.descripcion = result.data.descripcion,
                this.imagen = result.data.imagen,
                this.cantidadMaxima = result.data.cantidadMaxima,
                this.cantidadMinima = result.data.cantidadMinima,
                this.stock = result.data.stock,
                this.precioUnitarioCompra = result.data.precioUnitarioCompra,
                this.iva = result.data.iva,
                this.descuento = result.data.descuento,
                this.estado = (result.data.estado == true ? 1 : 0);

            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            var bandera = this.validarReferencia(id);
            if (bandera == true) {
                Swal.fire({
                    title: 'Esta usted seguro de eliminar?',
                    text: "No pordrá revertir los cambios!",
                    icon: 'Advertencia',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('http://localhost:9000/api/productos/' + id).then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: "'El registro se eliminó de forma correcta.'",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.loadData();
                        })
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error, registro tiene asociado un permiso al rol.'
                })
            }
        },
        dataAdd: function () {
            let data = {
                codigo : this.codigo,
                nombre : this.nombre,
                descripcion : this.descripcion,
                imagen : this.imagen,
                cantidadMaxima : this.cantidadMaxima,
                cantidadMinima : this.cantidadMinima,
                stock : this.stock,
                precioUnitarioCompra : this.precioUnitarioCompra,
                iva : this.iva,
                descuento : this.descuento,
                estado: parseInt(this.estado)
            };
            axios.post('http://localhost:9000/api/productos', data).then(result => {
                if (result.data) {
                    Swal.fire({
                        icon: 'success',
                        title: "'El registro se guardó de forma correcta.'",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loadData();
                    this.clearList();
                }
            });

        },
        dataUpdate: function () {
            let data = {
                codigo : this.codigo,
                nombre : this.nombre,
                descripcion : this.descripcion,
                imagen : this.imagen,
                cantidadMaxima : this.cantidadMaxima,
                cantidadMinima : this.cantidadMinima,
                stock : this.stock,
                precioUnitarioCompra : this.precioUnitarioCompra,
                iva : this.Iva,
                descuento : this.Descuento,
                estado: parseInt(this.estado)
            };
            axios.put('http://localhost:9000/api/productos/' + this.id, data).then(result => {
                if (result.data) {
                    Swal.fire({
                        icon: 'success',
                        title: "'El registro se guardó de forma correcta.'",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loadData();
                    this.clearList();
                }
            });

        },
        validarReferencia: function (id) {
            var bandera = true;

            this.listValidar.forEach((item, index) => {
                if (item.departmentId.id == id) {
                    bandera = false
                }
                console.log(index)
            })
            return bandera;

        },
        clearList: function () {
            this.id = 0,
                this.codigo = '',
                this.nombre = '',
                this.estado = '',
                this.listData = []
        }
    }
}
</script>