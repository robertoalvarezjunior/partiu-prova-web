import { Component } from '@angular/core';
import { Appbar } from "../../components/appbar/appbar";
import { MainButton } from "../../components/main-button/main-button";

@Component({
  selector: 'app-home',
  imports: [Appbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
