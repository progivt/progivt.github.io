import React from 'react';
import moment from 'moment-timezone';
moment.locale('ru');

import {activeLabs} from './lab.js';

function checkLabDeadline(deadline) {
  if (moment.tz(deadline, "Asia/Yakutsk").diff(moment.tz("Asia/Yakutsk")) > 0) {
      return deadline;
  }

  return '';
}

function getClosestDeadline() {
  if (activeLabs.length) {
    for (let i = 0; i < activeLabs.length; i++) {
      if (moment(activeLabs[i].deadline).diff(moment()) > 0) {
        return activeLabs[i];
      }
    }
  }
}

export default class DeadlineDisplayMain extends React.Component {
  constructor(props) {
    super(props);

    this.supressOutput = false;

    this.deadline = '';
    this.deadlineM = 0;

    this.activeLab = null;

    this.elementTitle = null;
    this.elementSubtitle = null;

    this.deadlineTitle = 'ProgIvt';
    this.deadlineLeft = 'Основы программирования ИВТ ИМИ';

    this.updateInterval = null;
  }

  componentDidMount() {
    this.activeLab = getClosestDeadline();

    if (this.activeLab) {
      if (typeof(document) != 'undefined') {
        this.elementTitle = document.getElementById("heroTitle");
        this.elementSubtitle = document.getElementById("heroSubtitle");

        this.elementTitle.innerHTML = `<a style="color:#FFFFFF" href="${this.activeLab.url}">${this.activeLab.name}</a>`;

        console.log(this.elementButton);
      }

      this.update();
      if (!this.updateInterval) {
        this.updateInterval = setInterval(this.update.bind(this), 1000);
      }
    }
  }

  update() {
    this.deadline = checkLabDeadline(this.activeLab.deadline);

    if (this.deadline != '') {
      this.deadlineM = moment.tz(this.deadline, "Asia/Yakutsk");
      this.deadlineLeft = 'До сдачи лабы: ' + this.deadlineM.diff(moment(), 'days') + ' дн. ' + moment.utc(this.deadlineM.diff(moment())).format('HH:mm:ss');
    }
    
    this.forceUpdate();
  }

  render() {
    return <div>{this.deadlineLeft}</div>;   
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
} 