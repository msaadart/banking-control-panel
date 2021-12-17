import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RequestService } from 'src/app/http/services/request.service';
import { Account } from './account';



@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any = 5;
  @ViewChild(MatSort) sort: MatSort | any;

  accountData: any = []
  pageIndex: number = 0;

  link: string = "/users"

  showColumns: string[] = ['email', 'firstName', 'lastName', 'personalId', 'profilePhoto', 'mobileNumber', 'gender', 'country', 'city', 'address', 'zipCode'];
  dataSource = new MatTableDataSource<Account>(this.accountData);

  constructor(
    private router: Router,
    private RequestService: RequestService,
  ) {
  }

  ngOnInit(): void {
    this.getUserAll();
    let url = window.location.href.split('/');
    this.pageIndex = Number(url[url.length - 1]);
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserAll() {
    this.RequestService.getAll(this.link).subscribe((res: any) => {
      this.accountData = res;
      this.dataSource = new MatTableDataSource<Account>(this.accountData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  viewUser(item: any) {
    this.router.navigate(['/users/add-edit/', item.id], { state: { user: item } })
  }

  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.router.navigateByUrl('/users/user-listing/' + e.pageIndex);
  }

}
