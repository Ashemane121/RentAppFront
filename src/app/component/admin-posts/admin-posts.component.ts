import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/post/post.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminPostInfoComponent } from '../admin-post-info/admin-post-info.component';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit{
  displayedColumns = ['id_post','brand','model','matricule','start_date','end_date','actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(
    private postService: PostService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.postService.GetAllPosts()
    .subscribe((response:any) =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  openPost(id: any) {
    const dialogRef = this.dialog.open(AdminPostInfoComponent, {
      width: '80%',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { id: id }
    });
  }
}
