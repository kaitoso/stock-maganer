import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


	clients: any;
	state: any;
	dataListView: any;
	// getDataFirstTime = true;

	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
		this.state = this.router.getCurrentNavigation();
		if (this.state.extras.state) {
			if (this.state.extras.state.showMsg) {
				Swal.fire(
					'',
					'La información ha sido guardada',
					'success'
				)
			}
		}
	}

	ngOnInit(): void {
    this.dataService.login("p","p");
		this.getClientsData();
		let t = this;
		$(document).on('click', ".invoice-data-table tr .invoice-action-delete", function(e:any) {
			let id = $(e.target).parent().data("id");
			t.deleteClient(id, 0);
		});
	}

	getClientsData() {
		if ( this.dataListView != undefined ) {
			this.dataListView.destroy();
		}
		this.dataService.getData().subscribe(res => {
			this.clients = res;
			let t = this;
				// console.log("init");
				setTimeout(function () {
					// if (t.getDataFirstTime) {
						t.initTable();
						// t.getDataFirstTime = false;
					// }
					// else {
					// 	t.dataListView.draw(true);
					// }
				}, 50);
		});
	}
 prueba(parametro:any){
	 console.log(parametro);
 }
	deleteClient(id: number, index: number) {
		console.log("PRueba");
		Swal.fire({
			title: '¿Está seguro que desea eliminar el registro?',
			text: 'No se podrá recuperar la información',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Borrar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.dataService.deleteClient(id).subscribe(res => {
					// this.dataListView.row($("tr[data-index='" + index + "']")).remove().draw();
					this.getClientsData();
					Swal.fire(
						'',
						'El registro ha sido eliminado',
						'success'
					)
				})
			}
		});
	}

	initTable() {
		this.dataListView = $(".invoice-data-table").DataTable({
			columnDefs: [
				{
					targets: 0,
					className: "control"
				},
				{
					orderable: true,
					targets: 1,
					checkboxes: { selectRow: true }
				},
				{
					targets: [0, 1],
					orderable: false
				},
				{ "orderable": false, "targets": 10 },
			],
			order: [3, 'asc'],
			dom:
				'<"top display-flex  mb-2"<"action-filters"f><"actions action-btns display-flex align-items-center">><"clear">rt<"bottom"p>',
			language: {
				search: "",
				searchPlaceholder: "Search Invoice"
			},
			select: {
				style: "multi",
				selector: "td:first-child>",
				items: "row"
			},
			responsive: {
				details: {
					type: "column",
					target: 0
				}
			}
		});
		// To append actions dropdown inside action-btn div
		var invoiceFilterAction = $(".invoice-filter-action");
		var invoiceCreateBtn = $(".invoice-create-btn");
		var filterButton = $(".filter-btn");
		$(".action-btns").append(invoiceFilterAction, invoiceCreateBtn);
		$(".dataTables_filter label").append(filterButton);
	}

}
