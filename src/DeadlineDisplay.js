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

    this.expiredText = 'Время вышло, лаба окончена!';
    this.activeText = 'До сдачи лабы: ';

    this.supressOutput = false;

    this.deadline = '';
    this.deadlineFormatted = '';
    this.deadlineLeft = this.expiredText;
    this.deadlineM = 0;

    this.updateInterval = null;
  }

  componentDidMount() {
    this.deadlineFormatted = moment.tz(this.props.deadline, "Asia/Yakutsk").format('lll');

    if (this.props.expiredText) {
      this.expiredText = this.props.expiredText;
    }

    if (this.props.activeText) {
      this.activeText  = this.props.activeText;
    }

    if (this.props.supressOutput) {
      this.supressOutput  = this.props.supressOutput;
    }


    this.update();
    if (!this.updateInterval) {
      this.updateInterval = setInterval(this.update.bind(this), 1000);
    }
  }

  update() {
    this.deadline = checkLabDeadline(this.props.deadline);

    if (this.deadline != '') {
      this.deadlineM = moment.tz(this.deadline, "Asia/Yakutsk");
      this.deadlineLeft = this.activeText + this.deadlineM.diff(moment(), 'days') + ' дн. ' + moment.utc(this.deadlineM.diff(moment())).format('HH:mm:ss');
    }
    else {
      this.deadlineLeft = this.expiredText;
    }
    this.forceUpdate();
  }

  render() {
    if (this.supressOutput) {
      return <div>{this.deadlineLeft}</div>;
    }
    else {
      return <div>Приглашение: <a href={this.props.link}>{this.props.link}</a><br/>Дедлайн: {this.deadlineFormatted}<br/><br/>{this.deadlineLeft}</div>;
    }
      
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
} 