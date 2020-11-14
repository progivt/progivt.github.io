import React from 'react';
import moment from 'moment-timezone';
moment.locale('ru');

function checkLabDeadline(deadline) {
  if (moment.tz(deadline, "Asia/Yakutsk").diff(moment.tz("Asia/Yakutsk")) > 0) {
      return deadline;
  }

  return '';
}


export default class DeadlineDisplay extends React.Component {
  constructor(props) {
    super(props);

    console.log("Creation");

    this.deadline = '';
    this.deadlineFormatted = '';
    this.deadlineLeft = 'Время вышло, лаба окончена!';
    this.deadlineM = 0;

    this.updateInterval = null;
  }

  componentDidMount() {
    this.deadlineFormatted = moment.tz(this.props.deadline, "Asia/Yakutsk").format('lll');
    this.update();
    if (!this.updateInterval) {
      this.updateInterval = setInterval(this.update.bind(this), 1000);
    }
  }

  update() {
    this.deadline = checkLabDeadline(this.props.deadline);

    if (this.deadline != '') {
      this.deadlineM = moment.tz(this.deadline, "Asia/Yakutsk");
      this.deadlineLeft = 'До сдачи лабы: ' + this.deadlineM.diff(moment(), 'days') + ' дн. ' + moment.utc(this.deadlineM.diff(moment())).format('HH:mm:ss');
    }
    else {
      this.deadlineLeft = 'Время вышло, лаба окончена!';
    }
    this.forceUpdate();
  }

  render() {
    return <div>Приглашение: <a href={this.props.link}>{this.props.link}</a><br/>Дедлайн: {this.deadlineFormatted}<br/><br/>{this.deadlineLeft}</div>;
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
} 