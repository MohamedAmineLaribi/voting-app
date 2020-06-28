import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";

import { vote } from "../store/actions";
import { color } from "../services/color";

const Poll = ({ poll, vote }) => {
  const answers =
    poll.options &&
    poll.options.map((options) => (
      <button
        onClick={() => vote(poll._id, { answer: options.options })}
        className="button"
        key={options._id}
      >
        {options.options}
      </button>
    ));

  const data = {
    labels: poll.options.map((options) => options.options),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map((options) => color()),
        borderColor: "#323643",
        data: poll.options.map((options) => options.votes),
      },
    ],
  };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
      <Pie data={data} />
    </div>
  );
};

export default connect(
  (store) => ({
    poll: store.currentPoll,
  }),
  { vote }
)(Poll);
