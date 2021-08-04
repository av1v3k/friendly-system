import React from "react";
import moment from "moment";
import "./Calendar.css";

class Calendar extends React.Component {
  state = {
    dateContext: moment(),
    today: moment(),
  };
  constructor(props) {
    super(props);

    this.width = props.width || "350px";
    this.style = props.style || {};
  }

  weekDays = moment.weekdays();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  };
  month = () => {
    return this.state.dateContext.format("MMMM");
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    return this.state.dateContext.get("date");
  };
  currentDay = () => {
    return this.state.dateContext.format("D");
  };

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext,
    });
  };

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext,
    });
  };

  firstDayofMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf("month").format("d");
    return parseInt(firstDay, 10);
  };

  currentMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(this.state.today);
    this.setState({
      dateContext: dateContext,
    });
  };

  render() {
    let blanks = [];
    for (let i = 0; i < this.firstDayofMonth(); i++) {
      blanks.push(
        <td key={i * 1000} className="empty">
          &nbsp;
        </td>
      );
    }

    console.log(blanks);

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === this.currentDate() ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d} className={className}>
          <span>{d}</span>
        </td>
      );
    }

    console.log(daysInMonth);

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElements = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>;
    });

    return (
      <div className="calendar-container">
        <span className="title">
          {this.month()} {this.year()}
        </span>
        <span className="navigation">
          <button type="button" onClick={(e) => this.prevMonth()}>
            {"<"}
          </button>
          <button type="button" onClick={(e) => this.currentMonth()}>
            {"Today"}
          </button>
          <button type="button" onClick={(e) => this.nextMonth()}>
            {">"}
          </button>
        </span>
        <table className="calendar">
          <thead>
            <tr className="calendar-header"></tr>
          </thead>
          <tbody>
            <tr>
              {this.weekDays.map((day) => {
                return (
                  <td key={day} className="week-day">
                    {day}
                  </td>
                );
              })}
            </tr>
            {trElements}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
