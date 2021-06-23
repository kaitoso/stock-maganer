
export interface Client {
	id:string;
	rut:string ;
	nombre :string ;
	apellido_paterno:string ;
	apellido_materno:string ;
	sexo:string ;
	fecha_nacimiento:string ;
	direccion:string ;
	numero:number;
	comuna_codigo:number;
	codigo_postal:string;
	telefono:number;
	celular:number;
	email:string ;
	region_codigo:number;
	provincia_codigo:number;
	comuna: {
		codigo:"",
		nombre:"" ,
		provincia_codigo:"",
		provincia: {
			codigo: ""    ,
			nombre: "",
			region_codigo: "",
			region: {
				codigo: "",
				nombre: "",
				provincias:[]
			},
			comunas:[]
		},
	};
	direccion_envio:{
		direccion: "",
		numero: "",
		comuna_codigo: "",
		codigo_postal: "",
		telefono: "",
		celular: "",
		calle_referencia: "",
		observaciones: "",
		region_codigo: "",
		provincia_codigo: "",
		comuna: {
			codigo: "",
			nombre: "",
			provincia_codigo: "",
			provincia: {
				codigo: "",
				nombre: "",
				region_codigo: "",
				region: {
					codigo: "",
					nombre: "",
					provincias: []
				},
				comunas: []
			},
		}
	}
}
