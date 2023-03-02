import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class TracketService {
  url = 'http://localhost:3000/'
  settings = new Subject()

  constructor(private service: SharedService, public http: HttpClient) { }
  keyMap: Map<string, string> = new Map<string, string>([
    ["CancellationReason", ""],
  ])

  getUsers() {
    let path = `${this.url}users`
    return this.http.get(path)
  }

  public getStudents() {
    let path = `${this.url}students`
    return this.http.get(path)
  }

  public getStudentsfilter(val) {
    let path = `${this.url}students?search=${val}`
    return this.http.get(path)
  }

  public getDashboard() {
    let path = `${this.url}api/dashboard`
    return this.http.get(path)
  }

  public uploadCsv(file) {
    var formData = new FormData();
    formData.append('file', file)
    let path = `${this.url}students/uploadCsv`
    return this.service.callService('post', formData, path)
  }

  deleteUser(id) {
    let path = `${this.url}users/deleteuser/${id}`
    return this.service.callService('delete', null, path)
  }
  deleteBulkUsers(users: any) {
    let path = `${this.url}users/deleteusersbulk`
    return this.service.callService('post', users, path)
  }

  editUser(id) {
    let path = `${this.url}users/edituser/${id}`
    return this.service.callService('put', null, path)
  }

  addUser(user: any) {
    let path = `${this.url}users/adduser`
    return this.service.callService('post', user, path)
  }

  addStudent(reqObj: any) {
    let path = `${this.url}students/addstudent`
    return this.service.callService('post', reqObj, path)
  }

  editStudent(reqObj: any, id) {
    let path = `${this.url}students/editstudent/:${id}`
    return this.service.callService('put', reqObj, path)
  }

  deleteStudent(id) {
    let path = `${this.url}students/deletestudent/${id}`
    return this.service.callService('delete', null, path)
  }
  deleteBulkStudents(students: any) {
    let path = `${this.url}students/deletestudentsbulk`
    return this.service.callService('post', students, path)
  }

  sendMail(data) {
    let path = `${this.url}api/sendmail`
    return this.service.callService('post', data, path)
  }

  uploadImageUser(data){
    let path = `${this.url}api/uploadImage/user`
    return this.service.callService('post', data, path)
  }

  getSettings() {
    let path = `http://localhost:3000/api/settings`
    return this.http.get(path)
  }

  checksettings(value){
    this.settings.next(value)
  }

}