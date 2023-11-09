import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesManagementService } from 'src/app/Services/roles-management.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  modules = [
    "Employee",
    "GeneralSetting",
    "Department",
    "Salary",
    "Attendance",
    "Permission",
  ];
  roleClaims: any[] = [];
  roles: any[] = [];
  roleId: string = '';
  updatedRoleClaims: { displayValue: string; isSelected: boolean }[] = [];
  FormRole = new FormGroup({
    roleName: new FormControl('', [Validators.required]),
    roleClaims: new FormControl(),
  })

  constructor(private rolesService: RolesManagementService, private elementRef: ElementRef) { }
  ngOnInit(): void {

    this.rolesService.GetDataToCreate().subscribe((response: any) => {
      this.roleClaims = response.roleClaims;
      this.updatedRoleClaims = JSON.parse(JSON.stringify(this.roleClaims));
      this.populateTable();
    });
    this.rolesService.GetAllRoles().subscribe((response: any) => {

      this.roles = response;

    })
  }

  OnSubmit(e: Event) {
    e.preventDefault();
    if (this.roleId != '') {
      console.log(this.roleId)
      this.rolesService.EditRole(this.FormRole.value, this.roleId).subscribe((response: any) => {
        this.rolesService.GetDataToCreate().subscribe((response: any) => {
          this.roleClaims = response.roleClaims;
          this.rolesService.GetAllRoles().subscribe((response: any) => {
            this.roles = response;
          })
          this.FormRole.reset();
          this.Reset();

        });
      });
    }
    else {
      console.log(this.FormRole.value);
      this.rolesService.AddRole(this.FormRole.value).subscribe((response: any) => {
        this.rolesService.GetDataToCreate().subscribe((response: any) => {
          this.roleClaims = response.roleClaims;
          this.rolesService.GetAllRoles().subscribe((response: any) => {
            this.roles = response;
          })
          this.FormRole.reset();
          this.Reset();
        });

      });
    }

  }

  OnEdit(id: any) {
    this.rolesService.GetRoleById(id).subscribe((response: any) => {
      this.roleId = id;
      console.log(this.roleId)

      this.FormRole.setValue({
        roleName: response.roleName,
        roleClaims: response.roleClaims
      });
      console.log(this.FormRole.value);
      this.roleClaims = response.roleClaims;

      this.Reset();
    });
  }


  OnDelete(id: any) {
    if (confirm("Are you sure you want to delete this role?")) {
      this.rolesService.DeleteRole(id).subscribe((response: any) => {
        this.rolesService.GetDataToCreate().subscribe((response: any) => {
          this.roleClaims = response.roleClaims;
          this.rolesService.GetAllRoles().subscribe((response: any) => {
            this.roles = response;
          })
          this.Reset();
        });
      })
    }
  }


  populateTable() {

    const table = this.elementRef.nativeElement.querySelector('#dt-filter-select');

    this.modules.forEach(module => {
      const row = table.insertRow();

      const cell1 = row.insertCell();
      cell1.textContent = module;

      this.roleClaims.forEach(claim => {
        if (
          claim.displayValue === `Permission.${module}.Create` ||
          claim.displayValue === `Permission.${module}.View` ||
          claim.displayValue === `Permission.${module}.Edit` ||
          claim.displayValue === `Permission.${module}.Delete`
        ) {
          const cell = row.insertCell();
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className = 'custom-control-input';
          checkbox.checked = claim.isSeleced;
          cell.appendChild(checkbox);

          // Add event listener to track changes in the checkboxes
          checkbox.addEventListener('change', () => {
            // Update the updatedRoleClaims array to reflect the change
            this.updatedRoleClaims = this.updatedRoleClaims.map(updatedClaim => {
              if (updatedClaim.displayValue === claim.displayValue) {
                return {
                  ...updatedClaim,
                  isSeleced: checkbox.checked,
                };
              }
              return updatedClaim;

            });
            this.FormRole.controls['roleClaims'].setValue(this.updatedRoleClaims);
          });

        }

      });
    });
  }

  Reset() {
    
    const table = this.elementRef.nativeElement.querySelector('#dt-filter-select');
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }

    // Redraw the table with the updated data
    this.populateTable();
  }
}
