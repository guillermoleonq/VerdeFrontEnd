<template>
    <div class="container">
        <form id="department">
            <fieldset>

                <div class="alert alert-secondary mt-3 p-1 text-center">
                    Registro de Unidades de medida
                </div>
                <!-- Datos de entarada del formulario -->
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="hidden" v-model="id">

                                    <label class="form-label mt-1">Código</label>
                                    <input type="text" class="form-control" v-model="codigo"
                                        placeholder="Ingresar código">

                                    <label class="form-label mt-1">Nombre</label>
                                    <input type="text" class="form-control" v-model="nombre"
                                        placeholder="Ingresar nombre">
                                    <label class="form-label mt-1">Descripción</label>
                                    <textarea type="text" class="form-control" v-model="descripcion"
                                        placeholder="Descripción de la medida"></textarea>
                                    <label class="form-label mt-1">Estado</label>
                                    <select class="form-select" v-model="estado">
                                        <option disabled :selected="true" value="">-- Seleccione --</option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
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
                    <div class="col-md-8">
                        <!-- Registros -->
                        <div class="card">
                            <div class="card-body">
                                <div class="alert p-1 text-center">
                                    Lista de Unidades de medida
                                </div>
                                <div>
                                    <table class="table table-hover">
                                        <thead class="text-center">
                                            <tr class="table-active">
                                                <td>Codigo</td>
                                                <td>Nombre</td>
                                                <td>Descripción</td>
                                                <td>Estado</td>
                                                <td>Acciones</td>
                                            </tr>
                                        </thead>
                                        <tbody id="dataResult">
                                            <tr v-for="item in listData" :key="item.id">
                                                <td>{{ item.codigo }}</td>
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.descripcion }}</td>
                                                <td>{{ item.estado == true ? 'Activo' : 'Inactivo' }}</td>
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
            descripcion: '',
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
            axios.get('http://localhost:9000/api/UnidadesMedidas').then(result => {
                this.listData = result.data
            })
            
        },
        findByid: function (id) {
            // metodo para consutlar por el ig del boton impreso en la vista
            axios.get('http://localhost:9000/api/UnidadesMedidas/' + id).then(result => {
                this.id = result.data.id;
                this.codigo = result.data.codigo;
                this.nombre = result.data.nombre;
                this.descripcion = result.data.descripcion;
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
                        axios.delete('http://localhost:9000/api/UnidadesMedidas/' + id).then(() => {
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
                codigo: this.codigo,
                nombre: this.nombre,
                descripcion: this.descripcion,
                estado: parseInt(this.estado)
            };
            axios.post('http://localhost:9000/api/UnidadesMedidas', data).then(result => {
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
                id: this.id,
                codigo: this.codigo,
                nombre: this.nombre,
                descripcion: this.descripcion,
                estado: parseInt(this.estado)
            };
            axios.put('http://localhost:9000/api/UnidadesMedidas/' + this.id, data).then(result => {
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
            this.descripcion = '',
            this.estado = '',
            this.listData = []
        }
    }
}
</script>