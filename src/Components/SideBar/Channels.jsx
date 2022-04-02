import React, { useState } from "react";

function Channels() {
  let channels = ["Avion", "Lasal", "Ateneo"];
  const [channelsArray, SetChannelsArray] = useState([channels]);

  return (
    <>
      <ul>
        {channelsArray.map((channel) => (
          <li>{channel}</li>
        ))}
      </ul>
    </>
  );
}

export default Channels;
