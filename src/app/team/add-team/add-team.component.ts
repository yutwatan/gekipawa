import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../team.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  addTeamForm: FormGroup;

  teamName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(6),
  ]);
  icon = new FormControl('', [ Validators.required ]);
  owner = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(5)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8)
  ]);
  typeAttack = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeBunt = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeSteal = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeMind = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  teamTotal = new FormControl('', [
    Validators.required,
    Validators.min(360),
    Validators.max(360),
    Validators.pattern(/\d{3}/)
  ]);
  param10 = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(2),
    Validators.pattern(/\d/)
  ]);
  param8and9 = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(6),
    Validators.pattern(/\d/)
  ]);

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private teamService: TeamService,
  ) {
    this.addTeamForm = this.builder.group({
      teamName: this.teamName,
      icon: this.icon,
      owner: this.owner,
      password: this.password,
      typeAttack: this.typeAttack,
      typeBunt: this.typeBunt,
      typeSteal: this.typeSteal,
      typeMind: this.typeMind,
      teamTotal: this.teamTotal,
      param10: this.param10,
      param8and9: this.param8and9,
      playerDataArray: this.builder.array([]),
      farmPlayerDataArray: this.builder.array([]),
      pitcherDataArray: this.builder.array([]),
    });
  }

  ngOnInit() {
    this.setPlayerFormArray(this.playerDataArray, 8);
    this.setPlayerFormArray(this.farmPlayerDataArray, 4);
    this.setPitcherFormArray(this.pitcherDataArray, 6);
    this.calcTeamParams();
  }

  onSelected(icon) {
    this.icon.setValue(icon.target.src.split('/').pop());
  }

  get playerDataArray(): FormArray {
    return this.addTeamForm.get('playerDataArray') as FormArray;
  }
  get farmPlayerDataArray(): FormArray {
    return this.addTeamForm.get('farmPlayerDataArray') as FormArray;
  }
  get pitcherDataArray(): FormArray {
    return this.addTeamForm.get('pitcherDataArray') as FormArray;
  }

  setPlayerFormArray(formArray, num) {
    for (let i = 0; i < num; i++) {
      formArray.push(this.builder.group({
        playerName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          this.teamService.duplicatePlayerNameValidator(this.addTeamForm)
        ]),
        position: new FormControl('捕', [
          Validators.required,
          this.teamService.duplicatePlayerPositionValidator()
        ]),
        power: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        meet: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        run: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        defense: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        playerSum: new FormControl(20, [
          Validators.required,
          Validators.min(10),
          Validators.max(28),
          Validators.pattern(/\d{2}/)
        ])
      }));
    }
  }

  setPitcherFormArray(formArray, num) {
    for (let i = 0; i < num; i++) {
      formArray.push(this.builder.group({
        playerName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          this.teamService.duplicatePlayerNameValidator(this.addTeamForm)
        ]),
        speed: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        change: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        control: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        defense: new FormControl(5, [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/\d{1,2}/)
        ]),
        playerSum: new FormControl(20, [
          Validators.required,
          Validators.min(10),
          Validators.max(28),
          Validators.pattern(/\d{2}/)
        ])
      }));
    }
  }

  setPlayerName(playerRole: string, i: number) {
    let name: string;

    switch (playerRole) {
      case 'player':
        name = this.playerDataArray.controls[i].get('playerName').value;
        this.teamService.playerName = {index: i, playerName: name};
        break;
      case 'farm':
        name = this.farmPlayerDataArray.controls[i].get('playerName').value;
        this.teamService.playerName = {index: i + 8, playerName: name};
        break;
      case 'pitcher':
        name = this.pitcherDataArray.controls[i].get('playerName').value;
        this.teamService.playerName = {index: i + 12, playerName: name};
        break;
    }
  }

  setPlayerPosition(i: number) {
    const position = this.playerDataArray.controls[i].get('position').value;
    this.teamService.position = {index: i, playerPosition: position};
  }

  calcPlayerSum() {
    for (const playerData of this.playerDataArray.controls) {
      playerData.get('playerSum').setValue(this.teamService.calcSum(playerData, 'player'));
    }

    for (const playerData of this.farmPlayerDataArray.controls) {
      playerData.get('playerSum').setValue(this.teamService.calcSum(playerData, 'player'));
    }

    for (const playerData of this.pitcherDataArray.controls) {
      playerData.get('playerSum').setValue(this.teamService.calcSum(playerData, 'pitcher'));
    }

    this.calcTeamParams();
  }

  calcTeamParams() {
    const params = this.teamService.calcTeamParams(
      this.playerDataArray.controls,
      this.farmPlayerDataArray.controls,
      this.pitcherDataArray.controls
    );

    this.teamTotal.setValue(params.total);
    this.param10.setValue(params.param10);
    this.param8and9.setValue(params.param8and9);
  }

  generatePlayerName() {
    this.teamService.clearPlayerNames();
    const position = ['捕', '一', '二', '三', '遊', '左', '中', '右'];

    for (const [i, playerData] of this.playerDataArray.controls.entries()) {
      playerData.get('playerName').setValue(this.teamService.generatePlayerName('player'));
      this.setPlayerName('player', i);

      playerData.get('position').setValue(position[i]);
    }

    for (const [j, playerData] of this.farmPlayerDataArray.controls.entries()) {
      playerData.get('playerName').setValue(this.teamService.generatePlayerName('player'));
      this.setPlayerName('farm', j);
    }

    for (const [k, playerData] of this.pitcherDataArray.controls.entries()) {
      playerData.get('playerName').setValue(this.teamService.generatePlayerName('pitcher'));
      this.setPlayerName('pitcher', k);
    }

    console.log('playerNames = ' + this.teamService.playerNamesData.length);
  }

  async add() {
    if (this.addTeamForm.invalid) {
      console.log('invalid!');
      return;
    }

    console.log('start add process');
    const user = await this.userService.addUser(this.addTeamForm);
    await this.teamService.addTeam(user.id, this.addTeamForm);
  }
}
